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
import { NextSeo, ProductJsonLd } from 'next-seo';
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
    <>
      <NextSeo
        title={product.seo.title}
        description={product.seo.metaDesc}
        canonical={product.seo.canonical}
        openGraph={{
          url: product.seo.opengraphUrl,
          title: product.seo.opengraphtitle,
          description: product.seo.opengraphDescription,
          images: [
            {
              url: product.seo.opengraphImage.sourceUrl,
              width: 800,
              height: 600,
              alt: product.seo.opengraphImage.altText,
            },
          ],
          site_name: product.seo.title,
        }}
      />
      <ProductJsonLd
        productName={product.name}
        images={[product.image.sourceUrl]}
        description={product.description}
        brand="Vestanesia"
        manufacturerName="Vestanesia Agrimart"
        disambiguatingDescription={product.shortDescription}
        releaseDate={product.date}
        productionDate={product.date}
        purchaseDate={product.date}
        aggregateRating={{
          ratingValue: product.averageRating,
        }}
        offers={[
          {
            price: product.price,
            priceCurrency: 'IDR',
            priceValidUntil: '2099-11-05',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            url: product.seo.canonical,
            seller: {
              name: 'Vestanesia Agrimart',
            },
          },
        ]}
      />
      <Layout>
        {product ? (
          <div className="single-product container mx-auto mt-32 mb-20 px-4 xl:px-56">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="product-images">
                {!isEmpty(product?.galleryImages?.nodes) ? (
                  <>
                    <GalleryCarousel
                      gallery={[
                        product?.image,
                        ...product?.galleryImages?.nodes,
                      ]}
                    />
                  </>
                ) : !isEmpty(product.image) ? (
                  <img
                    src={product?.image?.sourceUrl}
                    alt="Product Image"
                    width="100%"
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
                    {product?.regularPrice !== product?.price
                      ? product?.regularPrice
                      : ''}
                  </div>
                  <div className="text-4xl text-primary font-bold">
                    {product?.price}
                  </div>
                </div>
                <div className="flex md:block lg:flex justify-between items-center">
                  <div className="md:mb-4">
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
    </>
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
