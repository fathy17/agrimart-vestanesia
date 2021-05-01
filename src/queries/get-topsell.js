import { gql } from '@apollo/client';

/**
 * GraphQL categories and products query.
 */
const GET_TOPSELL_QUERY = gql`
  query {
    products(where: { orderby: { field: TOTAL_SALES } }, first: 4) {
      nodes {
        id
        databaseId
        onSale
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
      }
    }
  }
`;

export default GET_TOPSELL_QUERY;
