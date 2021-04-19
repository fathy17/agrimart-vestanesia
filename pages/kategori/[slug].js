import Layout from '../../src/components/Layout';
import client from '../../src/components/ApolloClient';
import Product from '../../src/components/Product';
import {
  PRODUCT_BY_CATEGORY_SLUG,
  PRODUCT_CATEGORIES_SLUGS,
} from '../../src/queries/product-by-category';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import GET_CATEGORIES_QUERY from '../../src/queries/get-categories';
import ALL_PRODUCTS_QUERY from '../../src/queries/get-all-products';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

export default function CategorySingle(props) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { products, categories, seo } = props;

  //   console.log(products);
  return (
    <>
      {router.query.slug !== 'semua-produk' ? (
        <NextSeo
          title={seo.title}
          description={seo.metaDesc}
          canonical={seo.canonical}
          openGraph={{
            url: seo.opengraphUrl,
            title: seo.opengraphtitle,
            description: seo.opengraphDescription,
            images: [
              {
                url: seo.opengraphImage?.sourceUrl,
                width: 800,
                height: 600,
                alt: seo.opengraphImage?.altText,
              },
            ],
            site_name: seo.title,
          }}
        />
      ) : null}
      <Layout>
        <div className="lg:grid lg:grid-cols-4 gap-8 container mx-auto mt-28 mb-20 px-4 xl:px-56">
          <div>
            <h3 className="text-lg text-primary font-semibold">
              KATEGORI PRODUK
            </h3>
            <div className="mt-4 mb-4">
              {categories
                .filter((i) => i.name !== 'Offers')
                .map((item) => (
                  <>
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <Link href={`/kategori/${item.slug}?sort=DATE`}>
                        <a>
                          <p className="font-semibold cursor-pointer hover:text-primary">
                            {item.name}
                          </p>
                        </a>
                      </Link>
                      <div className="text-xs px-2 text-white font-semibold rounded bg-gray-500">
                        {item.count}
                      </div>
                    </div>
                    <div className="pl-4">
                      {item.children.nodes.map((child) => (
                        <div
                          key={child.id}
                          className="flex justify-between items-center"
                        >
                          <Link href={`/kategori/${child.slug}?sort=DATE`}>
                            <a>
                              <p className="cursor-pointer hover:text-primary">
                                {child.name}
                              </p>
                            </a>
                          </Link>
                          <div className="text-xs px-2 text-white font-semibold rounded bg-gray-500">
                            {child.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center text-xs">
              <p>Beranda / Produk {`/ ${router.query.slug}`}</p>
              <p>Menampilkan {products.length} produk</p>
              <select
                onChange={(e) =>
                  router.push(
                    `/kategori/${router.query.slug}?sort=${e.target.value}`
                  )
                }
                name="sort"
                id="sort"
              >
                <option value="DATE">Default sorting</option>
                <option value="RATING">Sort by average rating</option>
                <option value="PRICE">Sort by price: low to high</option>
                <option value="PRICE">Sort by price: high to low</option>
              </select>
            </div>
            <hr className="border-t-2 border-dashed border-black my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {products.map((item) => (
                <Product key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
    query: { sort },
  } = context;

  console.log(context);

  const slugCond = slug !== 'semua-produk';

  const { data } = await client.query({
    query: slugCond ? PRODUCT_BY_CATEGORY_SLUG : ALL_PRODUCTS_QUERY,
    variables: { slug, sort },
  });

  const { data: categoriesData } = await client.query({
    query: GET_CATEGORIES_QUERY,
  });

  return {
    props: {
      categories: categoriesData?.productCategories?.nodes || [],
      products: slugCond
        ? data?.productCategory?.products?.nodes || []
        : data?.products?.nodes || [],
      seo: data?.productCategory?.seo || {},
    },
    // revalidate: 1,
  };
}

// export async function getStaticPaths() {
//   const { data } = await client.query({
//     query: PRODUCT_CATEGORIES_SLUGS,
//   });

//   const pathsData = [];

//   data?.productCategories?.nodes &&
//     data?.productCategories?.nodes.map((productCategory) => {
//       if (!isEmpty(productCategory?.slug)) {
//         pathsData.push({ params: { slug: productCategory?.slug } });
//       }
//     });

//   return {
//     paths: pathsData,
//     fallback: true,
//   };
// }
