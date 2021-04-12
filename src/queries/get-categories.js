import { gql } from '@apollo/client';

/**
 * GraphQL categories query.
 */
const GET_CATEGORIES_QUERY = gql`
  query {
    productCategories {
      nodes {
        id
        name
        slug
        parentId
        image {
          sourceUrl
          srcSet
        }
      }
    }
  }
`;

export default GET_CATEGORIES_QUERY;
