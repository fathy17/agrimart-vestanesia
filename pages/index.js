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
import GET_FRONTPAGE_QUERY from '../src/queries/get-frontpage';

export default function Home(props) {
  const { heroCarousel, onSale, seo, frontPage } = props;

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
              <img
                loading="lazy"
                src="/phone.png"
                alt="phone - Vestanesia Agrimart"
                className="h-14 w-14"
              />
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
              <img
                loading="lazy"
                src="/handshake.png"
                alt="handshake - Vestanesia Agrimart"
                className="h-14 w-14"
              />
              <h3 className="text-xl font-semibold my-4">
                Mendukung Produk Lokal
              </h3>
              <p>
                Vestanesia Agrimart menawarkan produk hasil pertanian lokal
                dalam rangka mendukung distribus ikomoditas pertanian yang
                efisien.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                loading="lazy"
                src="/Indonesia.png"
                alt="Indonesia - Vestanesia Agrimart"
                className="h-14 w-14"
              />
              <h3 className="text-xl font-semibold my-4">
                Pengiriman Ke Seluruh Indonesia.
              </h3>
              <p>
                Vestanesia Agrimart membuka kesempatan bagi petani untuk
                memasarkan produknya ke seluruh Indonesia
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                loading="lazy"
                src="/bantupetani.png"
                alt="#bantupetani - Vestanesia Agrimart"
                className="h-14 w-14"
              />
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
              loading="lazy"
              src={frontPage.gambarBanner?.sourceUrl}
              alt=""
              className="w-full object-cover"
              style={{ height: '22rem' }}
            />
            <div
              className="absolute top-0 w-full flex flex-col items-center justify-center bg-primary bg-opacity-75 text-white"
              style={{ height: '22rem' }}
            >
              {frontPage.ikonBanner?.sourceUrl && (
                <img
                  src={frontPage.ikonBanner?.sourceUrl}
                  alt=""
                  className="h-10"
                />
              )}
              <div
                className="banner-iklan"
                dangerouslySetInnerHTML={{
                  __html: frontPage.kontenBanner,
                }}
              />
            </div>
          </div>
          {/* Invest Feature */}
          <div className="container mx-auto my-16 p-4 xl:px-56 w-full">
            <div className="relative ">
              <img
                loading="lazy"
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
                      vestanesia.com
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

  const frontPage = await client.query({
    query: GET_FRONTPAGE_QUERY,
  });

  return {
    props: {
      frontPage: frontPage.data?.extension?.frontPage || {},
      seo: seo?.data?.seo || {},
      heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes || [],
      onSale: onSale?.data?.products?.nodes || [],
    },
    revalidate: 1,
  };
}
