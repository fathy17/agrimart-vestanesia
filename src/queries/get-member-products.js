import { gql } from '@apollo/client';

const MEMBER_PRODUCTS_QUERY = gql`
  query {
    products(where: { tag: "member" }) {
      nodes {
        id
        averageRating
        onSale
        slug
        description
        image {
          id
          uri
          title
          srcSet
          sourceUrl
        }
        productCategories {
          nodes {
            name
          }
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

export default MEMBER_PRODUCTS_QUERY;
