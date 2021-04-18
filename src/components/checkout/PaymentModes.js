import Error from './Error';

const PaymentModes = ({ input, handleOnChange }) => {
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
            defaultChecked
          />
          <span className="woo-next-payment-content">Direct Bank Transfer</span>
        </label>
      </div>
      {/*Pay with COD*/}
      <div className="form-check woo-next-payment-input-container mt-2">
        <label className="form-check-label">
          <input
            onChange={handleOnChange}
            value="cod"
            className="form-check-input mr-3"
            name="paymentMethod"
            type="radio"
          />
          <span className="woo-next-payment-content">Cash on Delivery</span>
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
          />
          <span className="woo-next-payment-content">Midtrans</span>
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
