import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import YourOrder from '../src/components/checkout/YourOrder';

export default function CheckoutBerhasil() {
  const router = useRouter();

  let orderData;

  if (typeof Storage !== 'undefined') {
    orderData = JSON.parse(localStorage.getItem('orderData'));
  }

  return (
    <Layout>
      <div className="checkout container mx-auto my-20 lg:my-32 lg:px-56 px-4">
        <h1 className="mb-2 text-4xl uppercase text-primary font-bold">
          Checkout
        </h1>
        <p className="font-semibold mb-4">Informasi Pembayaran</p>
        <p>Struk Belanja</p>
        <div>
          <YourOrder cart={orderData} />
        </div>
        {router.query.snap_token ? (
          ''
        ) : (
          <>
            <div className="rounded-3xl border-4 border-black p-4 mt-4">
              <p>Transfer Bank</p>
              <h3 className="text-2xl font-bold">BNI</h3>
              <div className="text-center mt-4">
                <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold text-primary">
                  009938 8839 2823
                </h1>
                <p className="font-semibold my-4">a.n Vestanesia Agrimart</p>
                <small className="text-gray-400">
                  Struk ini berlaku selama 18 jam setelah checkout
                </small>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col items-center mt-4">
          <p>
            Dapatkan penawaran menarik dari Vestanesia Agrimart dibawah ini.
          </p>
          <div className="mt-4 flex justify-around w-full">
            <button className="rounded-full text-xl bg-primary text-white px-8 font-semibold italic">
              Jadi Member
            </button>
            <button className="rounded-full text-xl bg-primary text-white py-2 px-8 font-semibold italic">
              Jadi Reseller
            </button>
          </div>
        </div>
      </div>
      {/* <button onClick={() => window.snap.pay(router.query.snap_token)}>
          Test Bayar
        </button> */}
    </Layout>
  );
}
