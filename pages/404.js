import React from 'react';
import Layout from '../src/components/Layout';
// import PageNotFoundImg from '../src/img/404.svg';

export default function Custom404() {
  return (
    <Layout>
      <div className="w-full mt-32 flex flex-col items-center justify-center container">
        <img className="w-2/4" src="/404.png" alt="Page not found" />
        <h1 className="text-2xl font-semibold mt-4">
          Mohon maaf, page tidak tersedia.
        </h1>
      </div>
    </Layout>
  );
}
