import React, { useContext, useEffect } from 'react';
import { ErrorContext } from '../context/ErrorContext';

export default function SnackBar() {
  const [error, setError] = useContext(ErrorContext);

  useEffect(() => {
    if (error === 'Expired token') {
      window.localStorage.removeItem('woo-session');
      window.localStorage.removeItem('woo-next-cart');
    }
    setInterval(function () {
      setError(null);
    }, 3000);
  }, []);

  return (
    <div
      className="fixed w-full flex justify-center z-50 top-3"
      style={{ top: '2rem' }}
    >
      <div
        className={`w-8/12 md:w-5/12 lg:w-5/12 ${
          error.item ? 'bg-primary' : 'bg-yellow-400'
        } py-3 px-10 rounded-lg text-gray-100 flex justify-between `}
      >
        <p>
          {error.item ? (
            <>
              <span className="font-bold">{error.item} </span>
              telah ditambahkan ke keranjang.
            </>
          ) : (
            'Terjadi kesalahan! Coba lagi.'
          )}
        </p>
        <span
          className="font-bold cursor-pointer"
          onClick={() => {
            setError(null);
          }}
        >
          X
        </span>
      </div>
    </div>
  );
}
