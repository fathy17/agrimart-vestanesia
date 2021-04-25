import Link from 'next/link';
// import AddToCartButton from '../components/cart/AddToCartButton';
import clientConfig from '../../client-config';
import { isEmpty } from 'lodash';
import Price from './single-product/price';
import BadgeRight from './icons/BadgeRight';

const Product = (props) => {
  const { product } = props;

  return (
    // @TODO Need to handle Group products differently.
    undefined !== product ? (
      <div className="product border rounded-md relative flex flex-col">
        {product.onSale ? (
          <div className="badge-right">
            <BadgeRight size={90} />
          </div>
        ) : null}
        <Link href={`/produk/${product.slug}`}>
          <a>
            {!isEmpty(product.image) ? (
              <img
                className="rounded-t-md bg-gray-100"
                src={product.image.sourceUrl}
                alt="Product image"
              />
            ) : !isEmpty(clientConfig.productImagePlaceholder) ? (
              <img
                className="rounded-t-md bg-gray-100"
                src={clientConfig.productImagePlaceholder}
                alt="Placeholder product image"
              />
            ) : null}
          </a>
        </Link>
        <div className="product-info p-4 flex justify-between items-center bg-white rounded-b-md flex-grow">
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
