import { useState, useContext, useEffect } from 'react';
import Billing from './Billing';
import YourOrder from './YourOrder';
import PaymentModes from './PaymentModes';
import { AppContext } from '../context/AppContext';
import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import { useMutation, useQuery } from '@apollo/client';
import { getFormattedCart, createCheckoutData } from '../../functions';
import OrderSuccess from './OrderSuccess';
import GET_CART from '../../queries/get-cart';
import { ErrorContext } from '../context/ErrorContext';
import Loader from '../Loader';
import CHECKOUT_MUTATION from '../../mutations/checkout';
import ADD_FEE_MUTATION from '../../mutations/add-fee';
import { v4 } from 'uuid';
import UPDATE_SHIPPING_METHOD_MUTATION from '../../mutations/update-shipping-method';
import { useRouter } from 'next/router';

const CheckoutForm = () => {
  // const initialState = {
  //   firstName: '',
  //   lastName: '',
  //   country: 'ID',
  //   address1: '',
  //   address2: '',
  //   city: '',
  //   state: '',
  //   postcode: '',
  //   phone: '',
  //   email: '',
  //   createAccount: false,
  //   orderNotes: '',
  //   paymentMethod: '',
  //   errors: null,
  // };

  // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
  const initialState = {
    firstName: 'Fathy',
    lastName: 'Sayed',
    address1: '109 Hills Road Valley',
    city: 'Pune',
    state: 'Maharastra',
    country: 'ID',
    postcode: '400298',
    phone: '9959338989',
    email: 'andifathyahmadfahrezy@gmail.com',
    createAccount: false,
    orderNotes: '',
    paymentMethod: 'midtrans',
    errors: null,
    shippingMethod: null,
    customerNote: '',
  };

  const [cart, setCart] = useContext(AppContext);
  const [_, setError] = useContext(ErrorContext);
  const [input, setInput] = useState(initialState);
  // const [orderData, setOrderData] = useState(null);
  const [errorCheckout, setErrorCheckout] = useState(null);

  const router = useRouter();

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART' );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
      console.log(data);
    },
  });

  // Checkout or CreateOrder Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading, error: checkoutError },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: createCheckoutData(input),
    },
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        setError(error?.graphQLErrors?.[0]?.message);
        setErrorCheckout(error?.graphQLErrors?.[0]?.message);
      }
    },
  });

  // Add Fee Mutation
  const [
    addfee,
    { data: adfeeResponse, loading: adfeeLoading, error: adfeeError },
  ] = useMutation(ADD_FEE_MUTATION, {
    variables: {
      input: {
        shipping: {
          country: input.country,
          state: input.state,
          city: input.city,
        },
        clientMutationId: v4(),
      },
    },
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        setError(error?.graphQLErrors?.[0]?.message);
      }
    },
  });

  // Add Fee Mutation
  const [
    updateShippingMethod,
    {
      data: shipingMethodResponse,
      loading: shipingMethodLoading,
      error: shipingMethodError,
    },
  ] = useMutation(UPDATE_SHIPPING_METHOD_MUTATION, {
    variables: {
      input: {
        clientMutationId: v4(),
        shippingMethods: [input.shippingMethod],
      },
    },
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        setError(error?.graphQLErrors?.[0]?.message);
      }
    },
  });

  useEffect(() => {
    if (checkoutResponse) {
      // const queryString = checkoutResponse.checkout.redirect.split('?');
      // const queryObject = JSON.parse(
      //   '{"' + queryString[1].replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      //   function (key, value) {
      //     return key === '' ? value : decodeURIComponent(value);
      //   }
      // );
      // router.push(
      //   `/checkoutSuccess?key=${queryObject.key}&snap_token=${queryObject.snap_token}`
      // );
      window.location.href = checkoutResponse.checkout.redirect;
    }
  }, [checkoutResponse]);

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
  };

  // useEffect(() => {
  //   addfee();
  // }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/*Billing Details*/}
        <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
          <div className="billing-details">
            <Billing input={input} handleOnChange={handleOnChange} />
          </div>
        </form>
        {/* Order & Payments*/}
        <div className="your-orders">
          <div className="flex mb-4 items-center">
            <h2 className="text-xl font-medium mr-4">Pengiriman</h2>
            <button
              onClick={() => {
                addfee();
              }}
              className="px-8 py-2 bg-primary text-white cursor-pointer hover:bg-yellow-500 rounded"
            >
              {loading || shipingMethodLoading || adfeeLoading ? (
                <Loader size={16} />
              ) : (
                'Estimasi Pengiriman'
              )}
            </button>
          </div>
          <div className="mb-4">
            {cart?.shippingMethods?.length
              ? cart.shippingMethods.map((item, index) => (
                  <div key={item.id}>
                    <label
                      className="form-check-label"
                      onClick={() =>
                        setTimeout(function () {
                          updateShippingMethod();
                        }, 3000)
                      }
                    >
                      <input
                        onChange={handleOnChange}
                        value={item.id}
                        className="form-check-input mr-3"
                        name="shippingMethod"
                        type="radio"
                        defaultChecked={index === 0}
                      />
                      <span className="woo-next-payment-content">
                        {item.label} (Rp. {item.cost})
                      </span>
                    </label>
                  </div>
                ))
              : 'Tidak ada pengiriman tersedia. Silahkan cek kembali alamat anda.'}
          </div>
          {/*	Order*/}
          <h2 className="text-xl font-medium mb-4">Pesananmu</h2>
          <YourOrder cart={cart} />
          {/*Payment*/}
          {/* <PaymentModes input={input} handleOnChange={handleOnChange} /> */}
          <div className="woo-next-place-order-btn-wrap mt-5">
            <button
              className="bg-primary hover:bg-yellow-500 text-white py-3 rounded w-auto xl:w-full text-center flex justify-center items-center"
              onClick={handleFormSubmit}
            >
              {checkoutLoading ? <Loader size={16} /> : 'Place Order'}
            </button>
            <div className="text-xs mt-4 text-red-500">{errorCheckout}</div>
          </div>
        </div>
      </div>

      {/*	Show message if Order Sucess*/}
      {/* <OrderSuccess response={checkoutResponse} /> */}
    </>
  );
};

export default CheckoutForm;
