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
          <div>
            <h3 className="text-primary text-2xl font-semibold">
              Kebijakan Pengembalian Produk
            </h3>
            <p>
              Sebelum membuka paket yang telah diterima dihrapkan merekam
              terlebih dahulu demi kepentingan retur barang, BILA TIDAK
              MENYERTAKAN BUKTI VIDEO MAKA KLAIM BARANG TIDAK BERLAKU. Produk
              masih tersegel, produk belum dibuka, atau belum terpakai sama
              sekali langsung mengirimkan ke head office kami pada alamat
              terlampir.
            </p>
            <br />
            <h3 className="text-primary text-2xl font-semibold">
              Jam Operasional Pengiriman
            </h3>
            <p>
              Jadwal Pengiriman: Senin s.d. Sabtu. Senin - Jumat pukul 11.00 dan
              15.30. Sabtu pukul 10.00 dan 13.30. Pick-Up pesanan pukul 11.00
              dan jam 15.30. Apabila ada pesanan yang masuk di atas pukul 15.30,
              akan diproses esok hari (jam kerja tersebut di atas). Untuk
              orderan yang masuk sebelum jam 15.30 akan di proses langsung.
            </p>
          </div>
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
