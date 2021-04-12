import { gql } from '@apollo/client';

/**
 * GraphQL categories and products query.
 */
const GET_ONSALE_QUERY = gql`
  query {
    products(where: { onSale: true }, first: 3) {
      nodes {
        id
        productId
        averageRating
        slug
        description
        image {
          id
          uri
          title
          srcSet
          sourceUrl
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

export default GET_ONSALE_QUERY;
