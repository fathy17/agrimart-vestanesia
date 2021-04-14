import { gql } from '@apollo/client';

/**
 * GraphQL reviews query.
 */
const GET_REVIEWS = gql`
  query Product($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      reviews(where: { orderby: COMMENT_DATE, order: ASC }) {
        edges {
          rating
        }
        nodes {
          id
          date
          content
          author {
            node {
              email
              name
            }
          }
        }
      }
    }
  }
`;

export default GET_REVIEWS;
