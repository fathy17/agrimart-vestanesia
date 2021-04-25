import { gql } from '@apollo/client';

/**
 * GraphQL categories and products query.
 */
const PRODUCTS_AND_CATEGORIES_QUERY = gql`
  query {
    heroCarousel: productCategories(where: { slug: "offers" }) {
      nodes {
        id
        children {
          nodes {
            id
            name
            slug
            databaseId
            description
            image {
              id
              sourceUrl
              srcSet
            }
          }
        }
      }
    }
  }
`;

export default PRODUCTS_AND_CATEGORIES_QUERY;
