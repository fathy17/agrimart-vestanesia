import React from 'react';
import Layout from '../src/components/Layout';

export default function konsultasi() {
  return (
    <Layout>
      <div className="checkout container mx-auto my-20 lg:my-32 lg:px-56 px-4">
        <h1 className="mb-5 text-4xl uppercase text-primary font-bold">
          KONSULTASI
        </h1>
        <h3 className="font-semibold mb-4">
          Konsultasi adalah layanan Vestanesia Agrimart kepada member untuk
          dapat berkonsultasi dengan ahli gizi mengenai tips-tips sehari-hari
          tentang gizi. Hubungi sekarang.
        </h3>
        <div className="mb-4">
          <label className="text-xs" htmlFor="kupon-konsultasi">
            Masukkan kupon member untuk berkonsultasi
          </label>
          <input
            className="block border-2 rounded w-full md:w-2/4 px-2 border-gray-500"
            type="text"
            placeholder="Cth: FAHMI1234(Terdiri dari nama dan 4 no. referral"
          />
        </div>
        <div className="border-4 border-gray-700 rounded-lg p-4">
          <h4>Kontak Ahli Gizi</h4>
          <div className="md:flex md:items-center">
            <img
              className="rounded-xl my-4 md:w-60 md:mr-8"
              src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
              alt=""
            />
            <h1 className="text-4xl font-bold">Pebriani, S.gz, M.gz</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
