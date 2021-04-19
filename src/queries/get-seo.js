import { gql } from '@apollo/client';

/**
 * GraphQL reviews query.
 */
const GET_SEO = gql`
  query {
    seo {
      schema {
        companyName
        siteName
        siteUrl
      }
      social {
        facebook {
          url
        }
        twitter {
          cardType
          username
        }
        youTube {
          url
        }
        instagram {
          url
        }
      }
      openGraph {
        defaultImage {
          sourceUrl
        }
        frontPage {
          description
          title
          image {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default GET_SEO;
