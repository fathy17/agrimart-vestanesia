import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import YourOrder from '../src/components/checkout/YourOrder';
import Link from 'next/link';

export default function CheckoutBerhasil() {
  const router = useRouter();

  let orderData;

  if (typeof Storage !== 'undefined') {
    orderData = JSON.parse(localStorage.getItem('orderData'));
  }

  return (
    <Layout>
      <div className="checkout container mx-auto my-28 lg:my-32 lg:px-56 px-4">
        <h1 className="mb-2 text-4xl uppercase text-primary font-bold">
          Checkout
        </h1>
        <p className="font-semibold mb-4">Informasi Pembayaran</p>
        <p>Struk Belanja</p>
        <div>
          <YourOrder cart={orderData} />
        </div>
        {router.query.snap_token || router.query.status_code ? (
          <>
            <div className="rounded-3xl border-4 border-black p-4 mt-4">
              <p>Pembayaran Dengan Virtual Account</p>
              <div className="flex flex-col items-center text-center mt-4">
                {router.query.snap_token ? (
                  <>
                    <h4 className="text-2xl font-bold ">
                      Silahkan lanjutkan pembayaran dengan menekan tombol di
                      bawah.
                    </h4>{' '}
                    <button
                      className="rounded-full bg-primary px-8 py-2 text-2xl text-white font-semibold my-4"
                      onClick={() => window.snap.pay(router.query.snap_token)}
                    >
                      Lanjutkan Pembayaran
                    </button>
                    <small className="text-gray-400">
                      Struk ini berlaku selama 2 jam setelah checkout
                    </small>
                  </>
                ) : (
                  <h4 className="text-2xl font-bold ">
                    Silahkan cek email anda untuk melihat detail dan instruksi
                    pembayaran.
                  </h4>
                )}
              </div>
            </div>
          </>
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
            <Link href="/jadi-member">
              <a>
                <button className="rounded-full text-xl bg-primary text-white py-1 lg:py-2 px-8 font-semibold italic">
                  Jadi Member
                </button>
              </a>
            </Link>
            <Link href="/produk/6x-amivit-capsule/">
              <a>
                <button className="rounded-full text-xl bg-primary text-white py-1 lg:py-2 px-8 font-semibold italic">
                  Jadi Reseller
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
