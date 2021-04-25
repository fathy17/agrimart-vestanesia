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
        ... on VariableProduct {
          price
          id
          regularPrice
        }
        ... on ExternalProduct {
          price
          id
          externalUrl
          regularPrice
        }
        ... on GroupProduct {
          id
          products {
            nodes {
              ... on SimpleProduct {
                id
                price
                regularPrice
              }
            }
          }
        }
      }
    }
  }
`;

export default ALL_PRODUCTS_QUERY;
