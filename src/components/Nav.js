import Link from 'next/link';
import CartIcon from './cart/CartIcon';
import { useContext, useState } from 'react';
import Modal from './Modal';
import CartItemsContainer from './cart/cart-page/CartItemsContainer';
import { AppContext } from './context/AppContext';

const Nav = ({ sticky }) => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [modal, setModal] = useState(false);
  const [cart] = useContext(AppContext);
  return (
    <>
      <nav
        className={` bg-white p-4 w-full z-40 shadow ${
          sticky ? 'fixed top-0 left-0 bg-opacity-75' : 'absolute '
        }`}
      >
        <div className="flex items-center justify-between flex-wrap container mx-auto">
          <div className="flex items-center flex-shrink-0 text-black mr-20">
            <svg
              className="fill-current h-8 w-8 mr-2 text-primary"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="font-semibold text-xl tracking-tight">
              <Link href="/">
                <a className="text-primary">LOGO</a>
              </Link>
            </span>
          </div>

          {/*Menu button*/}
          <div className="block lg:hidden">
            <button
              onClick={() => setMenuVisibility(!isMenuVisible)}
              className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          {/*MMenu in mobile*/}
          <div
            className={`${
              isMenuVisible ? 'max-h-full h-full' : 'h-0'
            } w-full overflow-hidden lg:h-full flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm font-medium lg:flex-grow">
              <Link href="/">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-primary mr-10">
                  Beranda
                </a>
              </Link>
              <Link href="/kategori/semua-produk?sort=DATE">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-primary mr-10">
                  Produk
                </a>
              </Link>
              <Link href="/jadi-member">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-primary mr-10">
                  Jadi Member
                </a>
              </Link>
              <Link href="/konsultasi">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-primary mr-10">
                  Konsultasi
                </a>
              </Link>
              <Link href="/wishlist">
                <a className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-primary mr-10">
                  Wishlist
                </a>
              </Link>
            </div>

            <div className="text-sm font-medium flex items-center md:mt-0 mt-4">
              <div className="border rounded p-2 mr-4 hover:bg-gray-100 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div
                onClick={() => {
                  setModal(true);
                }}
                className="cursor-pointer"
              >
                <CartIcon />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Modal
        isVisible={modal}
        title="Keranjang Anda"
        content={<CartItemsContainer />}
        footer={
          cart ? (
            <Link href="/checkout">
              <a>
                <button className="px-8 py-2 w-full font-semibold bg-primary text-white rounded hover:bg-yellow-500">
                  Checkout
                </button>
              </a>
            </Link>
          ) : null
        }
        onClose={() => setModal(false)}
      />
    </>
  );
};

export default Nav;
