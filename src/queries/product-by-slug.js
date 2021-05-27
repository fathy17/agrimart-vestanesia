import { gql } from '@apollo/client';

export const PRODUCT_BY_SLUG_QUERY = gql`
  query Product($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      averageRating
      slug
      description
      date
      informasiTambahan {
        informasiTambahan
      }
      shortDescription
      productCategories {
        nodes {
          name
        }
      }
      galleryImages {
        nodes {
          id
          title
          altText
          sourceUrl
        }
      }
      image {
        id
        uri
        title
        srcSet
        altText
        sourceUrl
      }
      name
      ... on SimpleProduct {
        price
        id
        regularPrice
      }
      ... on VariableProduct {
        price
        id
        regularPrice
      }
      ... on ExternalProduct {
        price
        id
        regularPrice
        externalUrl
      }
      ... on GroupProduct {
        products {
          nodes {
            ... on SimpleProduct {
              id
              price
              regularPrice
            }
          }
        }
        id
      }
      seo {
        canonical
        metaDesc
        metaKeywords
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphImage {
          altText
          sourceUrl
          title
          caption
        }
        opengraphTitle
        opengraphUrl
        opengraphType
        title
        twitterDescription
        twitterTitle
      }
    }
  }
`;

export const PRODUCT_SLUGS = gql`
  query Products {
    products(first: 5000) {
      nodes {
        id
        slug
      }
    }
  }
`;
