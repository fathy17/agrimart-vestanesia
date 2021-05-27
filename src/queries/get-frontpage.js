import { gql } from '@apollo/client';

/**
 * GraphQL frontPage query.
 */
const GET_FRONTPAGE_QUERY = gql`
  query {
    extension(id: "custom", idType: SLUG) {
      frontPage {
        gambarBanner {
          sourceUrl
        }
        ikonBanner {
          sourceUrl
        }
        kontenBanner
        noTelponCustomerService
      }
    }
  }
`;

export default GET_FRONTPAGE_QUERY;
