import { gql } from '@apollo/client';

/**
 * GraphQL categories query.
 */
const GET_CATEGORIES_QUERY = gql`
  query {
    productCategories(where: { parent: 0 }) {
      nodes {
        id
        name
        slug
        parentId
        image {
          sourceUrl
          srcSet
        }
        children {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

export default GET_CATEGORIES_QUERY;
