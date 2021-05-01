import { Fragment } from 'react';
import CheckoutCartItem from './CheckoutCartItem';

const YourOrder = ({ cart }) => {
  return (
    <Fragment>
      {cart ? (
        <Fragment>
          {/*Product Listing*/}
          <table className="checkout-cart table table-hover w-full mb-10">
            <thead>
              <tr className="woo-next-cart-head-container text-left">
                <th className="woo-next-cart-heading-el" scope="col" />
                <th className="woo-next-cart-heading-el" scope="col">
                  Product
                </th>
                <th className="woo-next-cart-heading-el" scope="col">
                  Qty
                </th>
                <th
                  className="woo-next-cart-heading-el text-right pr-4"
                  scope="col"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.products.length &&
                cart.products.map((item) => (
                  <CheckoutCartItem key={item.id} item={item} />
                ))}
              {/*SubTotal*/}
              <tr className="bg-gray-200">
                <td className="py-2" />
                <td className="woo-next-checkout-total font-normal text-xl py-2">
                  Subtotal
                </td>
                <td className="woo-next-checkout-total font-normal text-xl"></td>
                <td className="woo-next-checkout-total font-semibold text-xl text-right pr-4">
                  {cart.subTotal}
                </td>
              </tr>
              {/*Pengiriman*/}
              <tr className="bg-gray-200">
                <td className="py-2" />
                <td className="woo-next-checkout-total font-normal text-xl py-2">
                  Biaya Pengiriman
                </td>
                <td className="woo-next-checkout-total font-normal text-xl"></td>
                <td className="woo-next-checkout-total font-semibold text-xl text-right pr-4">
                  {cart.shippingTotal}
                </td>
              </tr>
              {/*Pengiriman*/}
              {cart.discountTotal !== 'Rp0' && (
                <tr className="bg-gray-200">
                  <td className="py-2" />
                  <td className="woo-next-checkout-total font-normal text-xl py-2">
                    Diskon
                  </td>
                  <td className="woo-next-checkout-total font-normal text-xl"></td>
                  <td className="woo-next-checkout-total font-semibold text-xl text-right pr-4">
                    {cart.discountTotal}
                  </td>
                </tr>
              )}
              {/*Total*/}
              <tr className="bg-gray-200">
                <td className="py-2" />
                <td className="woo-next-checkout-total font-normal text-xl py-2">
                  Total
                </td>
                <td className="woo-next-checkout-total font-normal text-xl"></td>
                <td className="woo-next-checkout-total font-bold text-xl text-right pr-4">
                  {cart.totalProductsPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default YourOrder;
