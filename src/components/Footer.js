import Link from 'next/link';
import { useEffect, useState } from 'react';
import GET_CATEGORIES_QUERY from '../queries/get-categories';
import MEMBER_PRODUCTS_QUERY from '../queries/get-member-products';
import client from './ApolloClient';
import BadgeLeft from './icons/BadgeLeft';

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [memberProducts, setMemberProducts] = useState([]);

  async function fetchCategories() {
    const { data } = await client.query({
      query: GET_CATEGORIES_QUERY,
    });
    setCategories(data?.productCategories?.nodes || []);
  }

  async function fetchMemberProducts() {
    const { data } = await client.query({
      query: MEMBER_PRODUCTS_QUERY,
    });
    setMemberProducts(data?.products?.nodes || []);
  }

  useEffect(() => {
    fetchCategories();
    fetchMemberProducts();
  }, []);

  return (
    <>
      {/*Top Seller*/}
      <div className="container mx-auto px-4 xl:px-56 my-16">
        <hr className="w-full my-6 border-t-2 border-black border-dashed" />
        <h1 className="text-4xl font-semibold mb-4">PAKET MEMBER</h1>
        {memberProducts.map((item) => (
          <Link key={item.id} href={`/produk/${item.slug}`}>
            <a>
              <div
                className="md:flex border-4 border-gray rounded-lg relative"
                style={{ width: 'fit-content' }}
              >
                <div className="badge-left">
                  <BadgeLeft size={90} />
                </div>
                <img
                  src={item.image.sourceUrl}
                  alt=""
                  className="w-full md:w-48 h-48 object-contain md:rounded-l-lg bg-gray-100"
                />
                <div className="p-4 flex flex-col justify-between">
                  <h1 className="mb-4 md:mb-0 text-2xl md:text-4xl font-bold">
                    {item.name}
                  </h1>
                  <div className="md:self-end text-3xl font-bold text-primary">
                    {item.price}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className="footer bg-gray-100 p-6 text-black xl:px-56">
        <div className="container mx-auto md:grid grid-cols-4 gap-8">
          <div className="footer-text">
            <h4 className="font-semibold border-l-4 pl-4 md:mt-0 mt-4 border-primary">
              VESTANESIA AGRIMART MARKETPLACE AGRICULTURE
            </h4>
            <br />
            <p className="text-xs">
              Vestanesia Agrimart merupakan platform digital website yang
              menawarkan jual beli produk pertanian, peternakan dan perikanan
              yang aman, gratis dan terpercaya. Mulai belanja atau daftarkan
              produk kamu.
            </p>
            <br />
            <p className="text-xs">
              Dapatkan keuntungan dan dukung petani Indonesia
            </p>
          </div>
          <div className="footer-text">
            <br />
            <h4 className="font-semibold border-l-4 pl-4 md:mt-0 mt-4 border-primary">
              KANTOR
            </h4>
            <br />
            <p className="text-xs">
              Jl. Perintis Kemerdekaan 16 Ruko Griya Athirah Permai Blok B6 Kota
              Makassar, Sulawesi Selatan
            </p>
            <br />
            <p className="text-xs">Kode Pos 90423</p>
          </div>
          <div className="footer-text">
            <h4 className="font-semibold border-l-4 pl-4 md:mt-0 mt-4 border-primary">
              DAPATKAN INFO PENAWARAN PRODUK
            </h4>
            <br />
            <form>
              <input
                type="text"
                className="w-full h-8 rounded focus:outline-none focus:ring focus:ring-primary px-2"
              />
            </form>
            <button className="w-full mt-4 py-1 rounded bg-yellow-500 text-gray-100 hover:bg-yellow-600">
              Dapatkan Info
            </button>
          </div>
          <div className="footer-text">
            <h4 className="font-semibold border-l-4 pl-4 md:mt-0 mt-4 border-primary">
              KATEGORI
            </h4>
            <br />
            <ul className="ml-4">
              {categories
                .filter((i) => i.name !== 'Offers')
                .map((item) => (
                  <li
                    key={item.id}
                    className="text-xs list-disc mb-2 cursor-pointer "
                  >
                    <Link href={`/kategori/${item.slug}?sort=DATE`}>
                      <a>
                        <p className="hover:text-primary font-semibold">
                          {item.name}
                        </p>
                      </a>
                    </Link>
                    <ul className="ml-4 mt-2">
                      {item.children.nodes.map((child) => (
                        <li
                          key={child.id}
                          className="text-xs list-disc mb-2 cursor-pointer "
                        >
                          <Link href={`/kategori/${child.slug}?sort=DATE`}>
                            <a>
                              <p className="hover:text-primary ">
                                {child.name}
                              </p>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full lg:px-56 bg-gray-600 text-gray-100 text-xs py-3 text-center">
        A Premium React Theme by{' '}
        <a href="https://ftyproject.xyz/" target="_blank">
          <span className="text-primary cursor-pointer">Fathy Fahrezy</span>
        </a>
      </div>
    </>
  );
};

export default Footer;
