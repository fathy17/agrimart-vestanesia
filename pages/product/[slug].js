import Layout from '../../src/components/Layout';
import { useRouter } from 'next/router';
import client from '../../src/components/ApolloClient';
import AddToCartButton from '../../src/components/cart/AddToCartButton';
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS,
} from '../../src/queries/product-by-slug';
import { isEmpty } from 'lodash';
import GalleryCarousel from '../../src/components/single-product/gallery-carousel';
import ProductDescripton from '../../src/components/ProductDescripton';
import ProductRecomendation from '../../src/components/ProductRecomendation';
// import Price from '../../src/components/single-product/price';

export default function Product(props) {
  const { product } = props;

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {product ? (
        <div className="single-product container mx-auto mt-32 mb-20 px-4 lg:px-56">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="product-images">
              {!isEmpty(product?.galleryImages?.nodes) ? (
                <>
                  <GalleryCarousel gallery={product?.galleryImages?.nodes} />
                </>
              ) : !isEmpty(product.image) ? (
                <img
                  src={product?.image?.sourceUrl}
                  alt="Product Image"
                  width="100%"
                  height="auto"
                  srcSet={product?.image?.srcSet}
                />
              ) : null}
            </div>
            <div className="product-info">
              <h4 className="products-main-title text-2xl font-bold ">
                {product.name}
              </h4>
              <hr className="border-t-2 border-dashed border-black my-4" />
              <div
                dangerouslySetInnerHTML={{
                  __html: product.shortDescription,
                }}
                className="product-description mb-5"
              />
              {/* <Price
                salesPrice={product?.price}
                regularPrice={product?.regularPrice}
              /> */}
              <div className="mb-4">
                <div className="text-primary line-through">
                  {product?.regularPrice}
                </div>
                <div className="text-4xl text-primary font-bold">
                  {product?.price}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Kategori :{' '}
                    <span className="font-normal">
                      {product.productCategories?.nodes?.[0]?.name}
                    </span>
                  </p>
                </div>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
          <ProductDescripton product={product} />
          <ProductRecomendation />
        </div>
      ) : (
        ''
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const { data } = await client.query({
    query: PRODUCT_BY_SLUG_QUERY,
    variables: { slug },
  });

  return {
    props: {
      product: data?.product || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PRODUCT_SLUGS,
  });

  const pathsData = [];

  data?.products?.nodes &&
    data?.products?.nodes.map((product) => {
      if (!isEmpty(product?.slug)) {
        pathsData.push({ params: { slug: product?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
