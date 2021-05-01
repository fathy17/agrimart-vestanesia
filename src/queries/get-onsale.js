import { gql } from '@apollo/client';

/**
 * GraphQL categories and products query.
 */
const GET_ONSALE_QUERY = gql`
  query {
    products(where: { featured: true }, first: 4) {
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

export default GET_ONSALE_QUERY;
