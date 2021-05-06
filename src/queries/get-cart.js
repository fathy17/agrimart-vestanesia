import { gql } from '@apollo/client';

const GET_CART = gql`
  query GET_CART {
    cart(recalculateTotals: true) {
      fees {
        amount
        id
        name
        total
      }
      appliedCoupons {
        code
      }
      availableShippingMethods {
        rates {
          cost
          id
          instanceId
          label
          methodId
        }
        packageDetails
        supportsShippingCalculator
      }
      chosenShippingMethods
      contents {
        nodes {
          key
          product {
            node {
              id
              databaseId
              name
              description
              type
              onSale
              slug
              averageRating
              reviewCount
              productTags {
                nodes {
                  slug
                }
              }
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              galleryImages {
                nodes {
                  id
                  sourceUrl
                  srcSet
                  altText
                  title
                }
              }
            }
          }
          variation {
            node {
              id
              name
              description
              type
              onSale
              price
              regularPrice
              salePrice
              image {
                id
                sourceUrl
                srcSet
                altText
                title
              }
              attributes {
                nodes {
                  id
                  name
                  value
                }
              }
            }
          }
          quantity
          total
          subtotal
          subtotalTax
        }
      }
      appliedCoupons {
        code
        discountAmount
        discountTax
      }
      subtotal
      subtotalTax
      shippingTax
      shippingTotal
      total
      totalTax
      feeTax
      feeTotal
      discountTax
      discountTotal
    }
  }
`;

export default GET_CART;
