import { gql } from '@apollo/client';

export const PRODUCT_BY_CATEGORY_SLUG = gql`
  query PRODUCT_BY_CATEGORY_SLUG($slug: ID!, $sort: ProductsOrderByEnum!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      name
      products(where: { orderby: { field: $sort } }) {
        nodes {
          id
          averageRating
          slug
          onSale
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
          ... on VariableProduct {
            price
            regularPrice
            id
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
                  regularPrice
                  price
                }
              }
            }
            id
          }
        }
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

export const PRODUCT_CATEGORIES_SLUGS = gql`
  query PRODUCT_CATEGORIES_SLUGS {
    productCategories {
      nodes {
        id
        slug
      }
    }
  }
`;
