import Layout from '../src/components/Layout';
import Product from '../src/components/Product';
import client from '../src/components/ApolloClient';
// import ParentCategoriesBlock from '../src/components/category/category-block/ParentCategoriesBlock';
import PRODUCTS_AND_CATEGORIES_QUERY from '../src/queries/product-and-categories';
import GET_TOPSELL_QUERY from '../src/queries/get-topsell';
import HeroCarousel from '../src/components/home/hero-carousel';
// import Price from '../src/components/single-product/price';
import GET_ONSALE_QUERY from '../src/queries/get-onsale';
import { NextSeo } from 'next-seo';
import GET_SEO from '../src/queries/get-seo';

export default function Home(props) {
  const { heroCarousel, onSale, seo } = props;

  return (
    <>
      <NextSeo
        title={seo.schema.siteName}
        description={seo.openGraph.frontPage.description}
        canonical={seo.schema.siteUrl}
        openGraph={{
          url: seo.schema.siteUrl,
          title: seo.openGraph.frontPage.title,
          description: seo.openGraph.frontPage.description,
          images: [
            {
              url: seo?.openGraph?.frontPage?.image?.sourceUrl,
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
            {
              url: seo?.openGraph?.defaultImage?.sourceUrl,
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
            },
          ],
          site_name: seo.schema.siteName,
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Layout>
        <div>
          {/*Hero Carousel*/}
          <HeroCarousel heroCarousel={heroCarousel} />
          {/* Feature */}
          <div className="products container mx-auto my-12 md:my-16 p-4 xl:px-56 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 lg:gap-8 sm:gap-4 gap-4">
            <div className="flex flex-col items-center text-center">
              <div className="text-primary w-12 h-12 flex justify-center items-center rounded-full p-2 border-primary border-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold my-4">
                24 Jam Customer Care
              </h3>
              <p>
                Vestanesia Agrimart melayani pelanggan 24 jam sehari dan 7 hari
                selama seminggu untuk memastikan kepuasan pelanggan terhadap
                produk
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-primary w-12 h-12 flex justify-center items-center rounded-full p-2 border-primary border-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold my-4">
                Mendukung Produk Lokal
              </h3>
              <p>
                Vestanesia Agrimart menawarkan produk hasil pertanian lokal
                dalam rangka mendukung distribusikomoditas pertanian yang
                efisien.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-primary w-12 h-12 flex justify-center items-center rounded-full p-2 border-primary border-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold my-4">
                Pengiriman Ke Seluruh Indonesia.
              </h3>
              <p>
                Vestanesia Agrimart membuka kesempatan bagi petani untuk
                memasarkan produknya ke seluruh Indonesia
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-primary w-12 h-12 flex justify-center items-center rounded-full p-2 border-primary border-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold my-4">
                Bantu Petani Indonesia
              </h3>
              <p>
                Dengan menjadi bagian Vestanesia Agrimart kamu menjadi bagian
                dalam gerakan #bantupetaniindonesia dalam memajukan pertanian
                Indonesia.
              </p>
            </div>
          </div>
          {/*Products*/}
          <div className="products w-full mx-auto my-24 p-4  xl:px-56 bg-gray-100 ">
            <div className="flex items-center">
              <hr className="w-full my-6 border-t-2 border-black" />
              <h2 className="px-4 whitespace-nowrap text-lg uppercase font-semibold">
                Produk Pilihan
              </h2>
              <hr className="w-full my-6 border-t-2 border-black" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 lg:gap-8 sm:gap-4 gap-4">
              {onSale.length
                ? onSale.map((product) => (
                    <Product key={product.id} product={product} />
                  ))
                : ''}
            </div>
          </div>
          {/* Promo */}
          <div className="container text-center mx-auto md:my-24 relative">
            <img
              src="https://www.deliveree.com/id/wp-content/uploads/sites/2/2016/05/mobil-engkel-box-fast-delivery-jabodetabek-og.jpg"
              alt=""
              className="w-full object-cover"
              style={{ height: '22rem' }}
            />
            <div
              className="absolute top-0 w-full flex flex-col items-center justify-center bg-primary bg-opacity-75 text-white"
              style={{ height: '22rem' }}
            >
              <svg
                className="w-16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
              <h1 className="text-2xl md:text-5xl font-bold py-8">
                BISA KIRIM KE SELURUH INDONESIA
              </h1>
              <p className="text-lg md:text-xl">
                Kami menyediakan pelayanan pengiriman ke seluruh indonesia
              </p>
            </div>
          </div>
          {/* Invest Feature */}
          <div className="container mx-auto my-16 p-4 xl:px-56 w-full">
            <div className="relative ">
              <img
                src="https://miro.medium.com/max/2800/0*UsAnHuCnx28okGKf"
                alt=""
                className="w-full rounded-3xl object-cover"
                style={{ height: '27rem' }}
              />
              <div
                className="absolute top-0 w-full flex flex-col bg-gray-400 bg-opacity-75 rounded-3xl items-center justify-center text-white text-center"
                style={{ height: '27rem' }}
              >
                <h1 className="text-xl md:text-4xl font-bold">
                  INGIN DAPAT UNTUNG DENGAN BERINVESTASI
                  <br />
                  DI SEKTOR PERTANIAN
                </h1>
                <h4 className="text-base md:text-xl mt-4 md:mt-16 mb-4">
                  kunjungi
                </h4>
                <a href="https://vestanesia.com/" target="_blank">
                  <div className="bg-primary  py-4 px-8 rounded-full cursor-pointer">
                    <h1 className="text-xl md:text-4xl font-semibold">
                      https://vestanesia.com/
                    </h1>
                  </div>
                </a>
              </div>
            </div>
          </div>
          {/*Categories*/}
          {/* <div className="product-categories-container container mx-auto my-20 px-4 xl:px-0">
        <h2 className="main-title text-xl mb-5 uppercase">
          <span className="main-title-inner">Categories</span>
        </h2>
        <ParentCategoriesBlock productCategories={productCategories} />
      </div> */}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
  });

  const onSale = await client.query({
    query: GET_ONSALE_QUERY,
  });

  const seo = await client.query({
    query: GET_SEO,
  });

  return {
    props: {
      seo: seo?.data?.seo || {},
      heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes || [],
      onSale: onSale?.data?.products?.nodes || [],
    },
    revalidate: 1,
  };
}
