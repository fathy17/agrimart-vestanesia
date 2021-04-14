import { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AppContext } from '../context/AppContext';
import { getFormattedCart } from '../../functions';
import Link from 'next/link';
import { v4 } from 'uuid';
import GET_CART from '../../queries/get-cart';
import ADD_TO_CART from '../../mutations/add-to-cart';
import { ErrorContext } from '../context/ErrorContext';
import Loader from '../Loader';

const AddToCart = (props) => {
  const { product } = props;

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.databaseId,
  };

  const [cart, setCart] = useContext(AppContext);
  const [_, setError] = useContext(ErrorContext);
  const [showViewCart, setShowViewCart] = useState(false);

  /**
   * @TODO will update this in future, when required.
   * Handles adding items to the cart.
   *
   * @return {void}
   */
  // const handleAddToCartLocalStorage = () => {
  //
  // 	// If component is rendered client side.
  // 	if ( process.browser ) {
  //
  // 		let existingCart = localStorage.getItem( 'woo-next-cart' );
  //
  // 		// If cart has item(s) already, update existing or add new item.
  // 		if ( existingCart ) {
  //
  // 			existingCart = JSON.parse( existingCart );
  //
  // 			const qtyToBeAdded = 1;
  //
  // 			const updatedCart = updateCart( existingCart, product, qtyToBeAdded );
  //
  // 			setCart( updatedCart );
  //
  // 		} else {
  // 			/**
  // 			 * If No Items in the cart, create an empty array and add one.
  // 			 * @type {Array}
  // 			 */
  // 			const newCart = addFirstProduct( product );
  // 			setCart( newCart );
  // 		}
  //
  // 		// Show View Cart Button
  // 		setShowViewCart( true )
  // 	}
  // };

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
    },
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: () => {
      // console.warn( 'completed ADD_TO_CART' );

      // If error.
      if (addToCartError) {
        setError(addToCartError.graphQLErrors[0].message);
      }

      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);
      setError({
        item: product.name,
        message: '',
      });
    },
    onError: (error) => {
      if (error) {
        setError(error.graphQLErrors[0].message);
      }
    },
  });

  const handleAddToCartClick = () => {
    // handleAddToCartLocalStorage();
    setError(null);
    addToCart();
  };

  return (
    <div>
      {/*	Check if its an external product then put its external buy link */}
      {'ExternalProduct' === product.__typename ? (
        <a
          href={product.externalUrl}
          target="_blank"
          className="px-4 py-2 font-semibold rounded-sm mr-3 text-sm bg-primary hover:bg-green-600 inline-block  text-white"
        >
          Buy now
        </a>
      ) : (
        <button
          onClick={handleAddToCartClick}
          className="px-4 py-2 font-semibold rounded-sm mr-3 text-sm bg-primary hover:bg-green-600  text-white"
        >
          {addToCartLoading ? <Loader size={16} /> : 'Tambahkan ke keranjang'}
        </button>
      )}
      {/* {showViewCart ? (
        <Link href="/cart">
          <button className="px-4 py-2 font-semibold rounded-sm text-sm bg-primary hover:bg-green-600 inline-block  text-white">
            View Cart
          </button>
        </Link>
      ) : (
        ''
      )} */}
    </div>
  );
};

export default AddToCart;
