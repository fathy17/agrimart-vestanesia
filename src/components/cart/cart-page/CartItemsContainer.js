import Link from 'next/link';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { getFormattedCart, getUpdatedItems } from '../../../functions';
import CartItem from './CartItem';
import { v4 } from 'uuid';
import { useMutation, useQuery } from '@apollo/client';
import UPDATE_CART from '../../../mutations/update-cart';
import GET_CART from '../../../queries/get-cart';
import CLEAR_CART_MUTATION from '../../../mutations/clear-cart';
import { isEmpty } from 'lodash';
import { ErrorContext } from '../../context/ErrorContext';
import Loader from '../../Loader';

const CartItemsContainer = () => {
  const [_, setError] = useContext(ErrorContext);
  // @TODO wil use it in future variations of the project.
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      // console.warn( 'completed GET_CART', data );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error?.graphQLErrors?.[0]?.message
          : '';
        setRequestError(errorMessage);
        setError(errorMessage);
      }
    },
  });

  // Update Cart Mutation.
  const [
    clearCart,
    { data: clearCartRes, loading: clearCartProcessing, error: clearCartError },
  ] = useMutation(CLEAR_CART_MUTATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = !isEmpty(error?.graphQLErrors?.[0])
          ? error.graphQLErrors[0]?.message
          : '';
        setRequestError(errorMessage);
        setError(errorMessage);
      }
    },
  });

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  // Clear the entire cart.
  const handleClearCart = (event) => {
    event.stopPropagation();

    if (clearCartProcessing) {
      return;
    }

    clearCart({
      variables: {
        input: {
          clientMutationId: v4(),
          all: true,
        },
      },
    });
  };

  return (
    <div className="w-full">
      {cart ? (
        <div className="woo-next-cart-wrapper container h-full w-full">
          <div className="">
            {/*Clear entire cart*/}
            <div className="clear-cart flex items-center justify-between">
              <button
                className="px-4 py-1 bg-yellow-500 text-white rounded-sm w-auto"
                onClick={(event) => handleClearCart(event)}
                disabled={clearCartProcessing}
              >
                <span className="woo-next-cart">Clear Cart</span>
                <i className="fa fa-arrow-alt-right" />
              </button>
              {clearCartProcessing ? <Loader size={14} /> : null}
              {updateCartProcessing ? <Loader size={14} /> : null}
            </div>
          </div>
          <div className="flex flex-col justify-between h-full w-full">
            <div className="w-full">
              {cart.products.length &&
                cart.products.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateCartProcessing={updateCartProcessing}
                    products={cart.products}
                    handleRemoveProductClick={handleRemoveProductClick}
                    updateCart={updateCart}
                  />
                ))}
            </div>

            {/*Cart Total*/}
            <div className=" border p-5 bg-gray-200">
              <div className="">
                {/* <h2 className="text-2xl">Cart Total</h2> */}
                {/* <div className="table-light flex flex-col">
                  <div className="woo-next-cart-element-total text-2xl font-normal">
                    Subtotal
                  </div>
                  <div className="woo-next-cart-element-amt text-2xl font-bold">
                    {'string' !== typeof cart.totalProductsPrice
                      ? cart.totalProductsPrice.toFixed(2)
                      : cart.totalProductsPrice}
                  </div>
                </div> */}
                <div className="flex justify-between items-center w-full">
                  <div className="woo-next-cart-element-total text-xl font-semibold">
                    Total
                  </div>
                  <div className="woo-next-cart-element-amt font-bold text-xl">
                    {'string' !== typeof cart.subTotal
                      ? cart.subTotal.toFixed(2)
                      : cart.subTotal}
                  </div>
                </div>
                {/* <Link href="/checkout">
                  <button className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full">
                    <span className="woo-next-cart-checkout-txt">
                      Proceed to Checkout
                    </span>
                    <i className="fas fa-long-arrow-alt-right" />
                  </button>
                </Link> */}
              </div>
            </div>
          </div>

          {/* Display Errors if any */}
          {requestError ? (
            <div className="row woo-next-cart-total-container mt-5">
              {' '}
              {requestError}{' '}
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-5">Keranjang anda kosong.</h2>
          <Link href="/">
            <button className="bg-primary text-white px-5 py-3 rounded-sm">
              <span className="woo-next-cart-checkout-txt">
                Tambah produk baru
              </span>
              <i className="fas fa-long-arrow-alt-right" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItemsContainer;
