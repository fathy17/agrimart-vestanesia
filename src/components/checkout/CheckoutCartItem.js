const CheckoutCartItem = ({ item }) => {
  return (
    <tr className="woo-next-cart-item" key={item.id}>
      <td className="woo-next-cart-element py-2">
        <img
          width="64"
          src={item.image.sourceUrl}
          srcSet={item.image.srcSet}
          alt={item.image.title}
        />
      </td>
      <td className="woo-next-cart-element">{item.name}</td>
      <td className="woo-next-cart-element">{item.qty}</td>
      <td className="woo-next-cart-element text-right pr-4">
        {item.totalPrice}
      </td>
    </tr>
  );
};

export default CheckoutCartItem;
