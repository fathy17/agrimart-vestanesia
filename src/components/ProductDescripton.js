import React, { useState } from 'react';
import ProductReview from './ProductReview';

export default function ProductDescripton({ product }) {
  const menu = ['Deskripsi', 'Informasi Tambahan', 'Penilaian Produk'];

  const [active, setActive] = useState(menu[0]);

  const renderTabswitch = () => {
    switch (active) {
      case 'Deskripsi':
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
            className="product-description"
          />
        );
      case 'Informasi Tambahan':
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: product.informasiTambahan?.informasiTambahan,
            }}
          />
        );
      case 'Penilaian Produk':
        return <ProductReview id={product.databaseId} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      <div className="flex">
        {menu.map((item) => (
          <p
            className={`mr-4 md:mr-8 cursor-pointer hover:text-primary  ${
              active === item
                ? 'border-b-2 border-primary text-primary font-semibold'
                : ''
            }`}
            key={item}
            onClick={() => {
              setActive(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
      <hr className="border-t-2 mb-4" style={{ marginTop: '-1.5px' }} />
      {renderTabswitch()}
    </div>
  );
}
