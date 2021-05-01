import Layout from '../src/components/Layout';
import RegisterCustomerForm from '../src/components/RegisterCustomerForm';

export default function JadiMember() {
  return (
    <Layout>
      <div className="checkout container mx-auto my-28 lg:my-32 lg:px-56 px-4">
        <h1 className=" text-4xl uppercase text-primary font-bold">
          Jadi Member
        </h1>
        <p>Isi fromulir di bawah untuk menjadi member</p>
        <div className="mt-4 grid grid-cols-1 xl:grid-cols-5 xl:gap-8">
          <RegisterCustomerForm />
          <div className="xl:col-span-2">
            <h2 className="text-2xl text-primary font-bold mb-4">
              JADILAH MEMBER DAN DAPATKAN DISKON HINGGA 20%
            </h2>
            <p>
              Dapatkan diskon semua produk Vestanesia Agrimart dengan menjadi
              member. Dengan membeli produk khusus member anda telah mendapatkan
              diskon hingga 20%. Buruan daftar menjadi member sekarang juga.
            </p>
            <img src="/member.png" alt="jadi member vestanesia agrimart" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
