import { gql } from '@apollo/client';

/**
 * GraphQL categories and products query.
 */
const GET_TOPSELL_QUERY = gql`
  query {
    products(where: { orderby: { field: TOTAL_SALES } }, first: 4) {
      nodes {
        id
        id
        averageRating
        slug
        description
        productCategories {
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

export default GET_TOPSELL_QUERY;
