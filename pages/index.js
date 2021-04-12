import Layout from '../src/components/Layout';
import Product from '../src/components/Product';
import client from '../src/components/ApolloClient';
import ParentCategoriesBlock from '../src/components/category/category-block/ParentCategoriesBlock';
import PRODUCTS_AND_CATEGORIES_QUERY from '../src/queries/product-and-categories';
import GET_TOPSELL_QUERY from '../src/queries/get-topsell';
import HeroCarousel from '../src/components/home/hero-carousel';
import Price from '../src/components/single-product/price';
import GET_ONSALE_QUERY from '../src/queries/get-onsale';

export default function Home(props) {
  const { products, productCategories, heroCarousel, topSell, onSale } = props;

  const topSellRender = (name, data) => {
    return (
      <div>
        <h3 className="font-bold mb-4">{name}</h3>
        {data?.map((item) => (
          <div
            key={item.id}
            className="flex border-gray-200 shadow rounded my-4 relative"
          >
            <img
              className="w-1/4 h-24 object-cover mr-4"
              src={item.image?.sourceUrl}
              alt=""
            />
            <div className="flex flex-col justify-between">
              <h3>{item.name}</h3>
              <Price
                salesPrice={item?.price}
                regularPrice={item?.regularPrice}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="mt-16">
        {/*Hero Carousel*/}
        <HeroCarousel heroCarousel={heroCarousel} />
        {/*Products*/}
        <div className="products container mx-auto my-24 px-4 xl:px-0">
          <h2 className="products-main-title main-title mb-5 text-xl uppercase">
            <span className="main-title-inner">Recently Added</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {products.length
              ? products.map((product) => (
                  <Product key={product.id} product={product} />
                ))
              : ''}
          </div>
        </div>
        {/*Categories*/}
        <div className="product-categories-container container mx-auto my-20 px-4 xl:px-0">
          <h2 className="main-title text-xl mb-5 uppercase">
            <span className="main-title-inner">Categories</span>
          </h2>
          <ParentCategoriesBlock productCategories={productCategories} />
        </div>
        {/*Top Seller*/}
        <div className="container mx-auto px-4 xl:px-0">
          <hr className="w-full border my-6 border-black" />
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {[
              { name: 'TOP SELLERS', data: topSell },
              { name: 'ON SALE', data: onSale },
              { name: 'FRESHLY ADDED', data: products },
            ].map((item) => topSellRender(item.name, item.data))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
  });

  const topsell = await client.query({
    query: GET_TOPSELL_QUERY,
  });

  const onSale = await client.query({
    query: GET_ONSALE_QUERY,
  });

  return {
    props: {
      productCategories:
        data?.productCategories?.nodes
          .filter((item) => item.parentId !== 'dGVybTozMA==')
          .slice(0, 3) || [],
      products: data?.products?.nodes ? data.products.nodes : [],
      heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes || [],
      topSell: topsell?.data?.products?.nodes || [],
      onSale: onSale?.data?.products?.nodes || [],
    },
    revalidate: 1,
  };
}
