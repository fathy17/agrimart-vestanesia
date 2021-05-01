import { gql } from '@apollo/client';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($sort: ProductsOrderByEnum!) {
    products(first: 9999, where: { orderby: { field: $sort } }) {
      nodes {
        id
        averageRating
        onSale
        slug
        description
        productTags {
          nodes {
            name
          }
        }
        image {
          id
          uri
          title
          srcSet
          sourceUrl
        }
        productCategories {
          nodes {
            name
          }
        }
        name
        ... on SimpleProduct {
          price
          regularPrice
          id
        }
      }
    }
  }
`;

export default ALL_PRODUCTS_QUERY;
