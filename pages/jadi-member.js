import React from 'react';
import Layout from '../src/components/Layout';

export default function JadiMember() {
  return (
    <Layout>
      <div className="checkout container mx-auto my-20 lg:my-32 lg:px-56 px-4">
        <h1 className=" text-4xl uppercase text-primary font-bold">
          Jadi Member
        </h1>
        <p>Isi fromulir di bawah untuk menjadi member</p>
        <div className="mt-4 grid grid-cols-1 xl:grid-cols-5 xl:gap-8">
          <form className="col-span-3 flex flex-col mb-4">
            <div className="mb-4">
              <label htmlFor="nama-lengkap">Nama Lengkap</label>
              <input
                className="h-8 w-full rounded border-2 border-gray-500 bg-primary bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                className="h-8 w-full rounded border-2 border-gray-500 bg-primary bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
                type="email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone-number">No. Handphone</label>
              <input
                className="h-8 w-full rounded border-2 border-gray-500 bg-primary bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="alasan">Alasan bergabung menjadi member</label>
              <textarea
                className="h-16 w-full rounded border-2 border-gray-500 bg-primary bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
                type="text"
              />
            </div>
            <button className="self-end rounded bg-primary py-1 px-4 text-white hover:bg-yellow-500">
              Daftar
            </button>
          </form>
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
