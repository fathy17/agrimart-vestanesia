import Layout from '../src/components/Layout';
import CheckoutForm from '../src/components/checkout/CheckoutForm';

const Checkout = () => (
  <Layout>
    <div className="checkout container mx-auto my-32 px-56">
      <h1 className="mb-5 text-4xl uppercase text-primary font-bold">
        Checkout Page
      </h1>
      <CheckoutForm />
    </div>
  </Layout>
);

export default Checkout;
