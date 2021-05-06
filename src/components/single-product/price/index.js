import { isEmpty } from 'lodash';
import { getFloatVal } from '../../../functions';

const Price = ({ regularPrice = 0, salesPrice }) => {
  if (isEmpty(salesPrice)) {
    return null;
  }

  /**
   * Get discount percent.
   *
   * @param {String} regularPrice
   * @param {String} salesPrice
   */
  const discountPercent = (regularPrice, salesPrice) => {
    if (isEmpty(regularPrice) || isEmpty(salesPrice)) {
      return null;
    }

    const formattedRegularPrice = getFloatVal(regularPrice);
    const formattedSalesPrice = getFloatVal(salesPrice);

    const discountPercent =
      ((formattedRegularPrice - formattedSalesPrice) / formattedRegularPrice) *
      100;

    return {
      discountPercent:
        formattedSalesPrice !== formattedRegularPrice
          ? `(${discountPercent.toFixed(2)}%) OFF`
          : null,
      strikeThroughClass:
        formattedSalesPrice < formattedRegularPrice
          ? 'product-regular-price line-through text-xs text-primary font-normal'
          : '',
    };
  };

  const productMeta = discountPercent(regularPrice, salesPrice);

  return (
    <div className="product-price font-semibold ">
      {/* Discounted price */}
      <div className={productMeta?.strikeThroughClass}>{regularPrice}</div>

      {/* Regular price */}
      {productMeta?.discountPercent ? (
        <div className="product-price text-primary font-bold">{salesPrice}</div>
      ) : null}

      {/* Discount percent */}
      {/* <span className="product-discount text-green-600 font-bold text-sm ">
        {productMeta?.discountPercent}
      </span> */}
    </div>
  );
};

export default Price;
