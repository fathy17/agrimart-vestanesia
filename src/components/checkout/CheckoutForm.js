import { useState, useContext, useEffect } from 'react';
import Billing from './Billing';
import YourOrder from './YourOrder';
import PaymentModes from './PaymentModes';
import { AppContext } from '../context/AppContext';
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import { useMutation, useQuery } from '@apollo/client';
import {
  getFormattedCart,
  createCheckoutData,
  getFloatVal,
} from '../../functions';
import GET_CART from '../../queries/get-cart';
import { ErrorContext } from '../context/ErrorContext';
import Loader from '../Loader';
import CHECKOUT_MUTATION from '../../mutations/checkout';
import ADD_FEE_MUTATION from '../../mutations/add-fee';
import { v4 } from 'uuid';
import UPDATE_SHIPPING_METHOD_MUTATION from '../../mutations/update-shipping-method';
import { useRouter } from 'next/router';
import Error from './Error';
import APPLY_COUPON_MUTATION from '../../mutations/apply-coupon';

const CheckoutForm = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'ID',
    postcode: '',
    phone: '',
    email: '',
    createAccount: false,
    orderNotes: '',
    paymentMethod: '',
    errors: null,
    shippingMethod: null,
    customerNote: '',
    coupon: '',
    memberPackage: false,
  };

  const router = useRouter();

  const [cart, setCart] = useContext(AppContext);
  const [_, setError] = useContext(ErrorContext);
  const [input, setInput] = useState(initialState);

  const [errorCheckout, setErrorCheckout] = useState(null);

  // Get Cart Data.
  const { loading, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
      setInput({ ...input, coupon: data.cart.appliedCoupons?.[0]?.code });

      // Update cart data in React Context.
      setCart(updatedCart);

      setInput({
        ...input,
        memberPackage: getFloatVal(data.cart.total) > 850000,
      });
    },
  });

  // Checkout or CreateOrder Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: createCheckoutData(input),
    },
    onCompleted: () => {
      localStorage.setItem('woo-next-cart', null);
    },
    onError: (error) => {
      if (error) {
        setError(error?.graphQLErrors?.[0]?.message);
        setErrorCheckout(error?.graphQLErrors?.[0]?.message);
      }
    },
  });

  // Add Fee Mutation
  const [addfee, { loading: adfeeLoading }] = useMutation(ADD_FEE_MUTATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        setError(error?.graphQLErrors?.[0]?.message);
      }
    },
  });

  // Update Shipping Mutation
  const [updateShippingMethod, { loading: shipingMethodLoading }] = useMutation(
    UPDATE_SHIPPING_METHOD_MUTATION,
    {
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          setError(error?.graphQLErrors?.[0]?.message);
        }
      },
    }
  );

  // Use Coupon Mutation
  const [useCoupon, { loading: useCouponLoading }] = useMutation(
    APPLY_COUPON_MUTATION,
    {
      variables: { input: { code: input.coupon } },
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        if (error) {
          setError(error?.graphQLErrors?.[0]?.message);
        }
      },
    }
  );

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const result = validateAndSanitizeCheckoutForm(input);
    if (!result.isValid) {
      setInput({ ...input, errors: result.errors });
      return;
    }
    // const checkOutData = createCheckoutData(input);
    // setOrderData(checkOutData);
    localStorage.setItem('orderData', JSON.stringify(cart));
    setError(null);
    checkout();
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleOnChange = (event) => {
    if ('createAccount' === event.target.name) {
      const newState = { ...input, [event.target.name]: !input.createAccount };
      setInput(newState);
    } else {
      const newState = { ...input, [event.target.name]: event.target.value };
      setInput(newState);
    }

    if (event.target.name === 'city') {
      addfee({
        variables: {
          input: {
            shipping: {
              country: input.country || '',
              state: input.state || '',
              city: event.target.value || '',
            },
            clientMutationId: v4(),
          },
        },
      });
    }
  };

  const renderShippingMethod = () => {
    return cart?.shippingMethods?.length
      ? cart.shippingMethods.map((item) => (
          <div key={item.id}>
            <label className="form-check-label">
              <input
                onChange={handleOnChange}
                onClick={() =>
                  updateShippingMethod({
                    variables: {
                      input: {
                        clientMutationId: v4(),
                        shippingMethods: [item.id],
                      },
                    },
                  })
                }
                value={item.id}
                className="form-check-input mr-3"
                name="shippingMethod"
                type="radio"
              />
              <span className="woo-next-payment-content">
                {item.label} (Rp. {item.cost})
              </span>
            </label>
          </div>
        ))
      : 'Tidak ada pengiriman tersedia. Silahkan cek kembali alamat anda.';
  };

  useEffect(() => {
    if (checkoutResponse?.checkout?.order?.paymentMethod === 'midtrans') {
      const queryString = checkoutResponse.checkout.redirect.split('?');
      const queryObject = JSON.parse(
        '{"' + queryString[1].replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === '' ? value : decodeURIComponent(value);
        }
      );
      router.push(
        `/checkout-berhasil?key=${queryObject.key}&snap_token=${queryObject.snap_token}&database_id=${checkoutResponse.checkout.order.databaseId}`
      );
      // window.location.href = checkoutResponse.checkout.redirect;
    }
    if (checkoutResponse?.checkout?.order?.paymentMethod === 'bacs') {
      router.push(
        `/checkout-berhasil?database_id=${checkoutResponse.checkout.order.databaseId}`
      );
    }
    if (!input.city) {
      addfee({
        variables: {
          input: {
            shipping: {
              country: 'ID',
              state: '',
              city: '',
            },
            clientMutationId: v4(),
          },
        },
      });
    }
  }, [checkoutResponse]);

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-20 gap-10">
        <div>
          {/*Billing Details*/}
          <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
            <div className="billing-details">
              <Billing input={input} handleOnChange={handleOnChange} />
            </div>
          </form>
          {/* Coupon */}
          <div>
            <label className="font-semibold">Masukkan kupon member</label>
            <div className="flex">
              <input
                type="text"
                name="coupon"
                className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded"
                onChange={handleOnChange}
                id="coupon"
                value={input.coupon}
              />
              <button
                onClick={() => {
                  if (input.coupon) {
                    useCoupon();
                  }
                }}
                className="px-8 ml-4 border border-primary rounded text-primary hover:bg-primary hover:text-white"
              >
                Pakai
              </button>
            </div>
          </div>
        </div>
        {/* Order & Payments*/}
        <div className="your-orders">
          <div className="flex mb-4 items-center">
            <h2 className="text-xl font-medium mr-4">Pengiriman</h2>
            {loading || shipingMethodLoading || adfeeLoading ? (
              <div className="px-4 py-2 text-primary">
                <Loader size={24} />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="mb-4">
            {renderShippingMethod()}
            <Error errors={input.errors} fieldName={'shippingMethod'} />
          </div>
          {/*	Order*/}
          <h2 className="text-xl font-medium mb-4">Pesananmu</h2>
          <YourOrder cart={cart} />
          {/*Payment*/}
          <PaymentModes input={input} handleOnChange={handleOnChange} />
          <div className="woo-next-place-order-btn-wrap mt-5 w-full">
            <button
              className="bg-primary hover:bg-yellow-500 text-white py-3 rounded w-full text-center flex justify-center items-center"
              onClick={handleFormSubmit}
            >
              {checkoutLoading ? <Loader size={16} /> : 'Place Order'}
            </button>
            <div className="text-xs mt-4 text-red-500">{errorCheckout}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
