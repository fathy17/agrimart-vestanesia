import React, { useEffect, useState } from 'react';
import ProductCard from '../components/Product';
import GET_TOPSELL_QUERY from '../queries/get-topsell';
import client from './ApolloClient';

export default function ProductRecomendation() {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const { data } = await client.query({
      query: GET_TOPSELL_QUERY,
    });
    setProducts(data?.products?.nodes || []);
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-2xl mb-4">REKOMENDASI PRODUK</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
