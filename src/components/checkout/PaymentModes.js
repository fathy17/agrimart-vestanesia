import Error from './Error';

const PaymentModes = ({ input, handleOnChange }) => {
  console.log(input.memberPackage);
  return (
    <div className="mt-3">
      <Error errors={input.errors} fieldName={'paymentMethod'} />
      {/*Direct bank transfers*/}
      <div className="form-check woo-next-payment-input-container mt-2">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="bacs"
            className="form-check-input mr-3"
            name="paymentMethod"
            type="radio"
          />
          <span className="woo-next-payment-content cursor-pointer">
            Transfer dengan bank BNI
          </span>
        </label>
      </div>
      {/*Pay with Midtrans*/}
      <div className="form-check woo-next-payment-input-container mt-2">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="midtrans"
            className="form-check-input mr-3"
            name="paymentMethod"
            type="radio"
            disabled={input.memberPackage}
          />
          <span
            title={
              input.memberPackage
                ? 'Pembayaran pembelian paket member tidak bisa menggunakan virtual account'
                : ''
            }
            className={`woo-next-payment-content ${
              input.memberPackage
                ? 'text-gray-500 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            Bayar dengan virtual account
          </span>
        </label>
      </div>
      {/*	Payment Instructions*/}
      {/* <div className="woo-next-checkout-payment-instructions mt-2">
        Please send a check to Store Name, Store Street, Store Town, Store State
        / County, Store Postcode.
      </div> */}
    </div>
  );
};

export default PaymentModes;
