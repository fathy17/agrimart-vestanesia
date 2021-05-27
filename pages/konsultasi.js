import React from 'react';
import client from '../src/components/ApolloClient';
import Layout from '../src/components/Layout';
import GET_KONSULTASI_QUERY from '../src/queries/get-konsultasi';

export default function konsultasi(props) {
  const { konsultasi } = props;
  // console.log(konsultasi);
  return (
    <Layout>
      <div className="checkout container mx-auto my-24 lg:my-32 lg:px-56 px-4">
        <h1 className="mb-5 text-4xl uppercase text-primary font-bold">
          KONSULTASI
        </h1>
        <h3 className="font-semibold mb-4">
          {konsultasi.deskripsi}{' '}
          <a
            className="underline text-primary"
            href={`https://wa.me/${konsultasi.noTelepon}`}
            target="_blank"
          >
            {konsultasi.noTelepon}
          </a>
        </h3>
        {/* <div className="mb-4">
          <label className="text-xs" htmlFor="kupon-konsultasi">
            Masukkan kupon member untuk berkonsultasi
          </label>
          <input
            className="block border-2 rounded w-full md:w-2/4 px-2 border-gray-500"
            type="text"
            placeholder="Cth: FAHMI1234(Terdiri dari nama dan 4 no. referral"
          />
        </div> */}
        <div className="border-4 border-gray-700 rounded-lg p-4">
          <h4>Kontak Ahli Gizi</h4>
          <div className="md:flex md:items-center">
            <img
              loading="lazy"
              className="rounded-xl my-4 md:w-60 md:mr-8"
              src={konsultasi.foto?.sourceUrl}
              alt=""
            />
            <h1 className="text-4xl font-bold">{konsultasi.namaKonsultan}</h1>
          </div>
        </div>
        {/* <a href={`https://wa.me/6281342217536`} target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fixed bottom-8 right-8 w-20 z-10 "
            viewBox="0 0 24 24"
            fill="#89b53d"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
          </svg>
        </a> */}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_KONSULTASI_QUERY,
  });

  return {
    props: {
      konsultasi: data?.extension?.konsultasi || {},
    },
    revalidate: 1,
  };
}
