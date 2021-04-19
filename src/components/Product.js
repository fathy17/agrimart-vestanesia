import Link from 'next/link';
// import AddToCartButton from '../components/cart/AddToCartButton';
import clientConfig from '../../client-config';
import { isEmpty } from 'lodash';
import Price from './single-product/price';

const Product = (props) => {
  const { product } = props;

  return (
    // @TODO Need to handle Group products differently.
    undefined !== product ? (
      <div className="product border rounded-md">
        <Link href={`/produk/${product.slug}`}>
          <a>
            {!isEmpty(product.image) ? (
              <img
                className="rounded-t-md"
                src={product.image.sourceUrl}
                alt="Product image"
              />
            ) : !isEmpty(clientConfig.productImagePlaceholder) ? (
              <img
                className="rounded-t-md"
                src={clientConfig.productImagePlaceholder}
                alt="Placeholder product image"
              />
            ) : null}
          </a>
        </Link>
        <div className="product-info p-4 flex justify-between items-center bg-white rounded-b-md">
          <div>
            <h3 className="product-title font-medium text-gray-800">
              {product.name ? product.name : ''}
            </h3>
            <p className="text-xs">
              {product?.productCategories?.nodes?.[0]?.name}
            </p>
          </div>
          <Price
            salesPrice={product?.price}
            regularPrice={product?.regularPrice}
          />
          {/* <AddToCartButton product={product} /> */}
        </div>
      </div>
    ) : (
      ''
    )
  );
};

export default Product;
