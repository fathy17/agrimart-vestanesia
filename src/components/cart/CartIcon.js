import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Link from 'next/link';

const CartIcon = () => {
  const [cart] = useContext(AppContext);
  const productsCount =
    null !== cart && Object.keys(cart).length ? cart.totalProductsCount : '';
  const totalPrice =
    null !== cart && Object.keys(cart).length ? cart.totalProductsPrice : '';

  return (
    <div className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
      <div className="bg-primary py-2 px-4 rounded flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>

        <p className="ml-4 text-white font-normal">
          {productsCount ? productsCount : 0} items
        </p>

        {/*{ totalPrice ? <span>{ totalPrice }</span> : '' }*/}
      </div>
    </div>
  );
};

export default CartIcon;
