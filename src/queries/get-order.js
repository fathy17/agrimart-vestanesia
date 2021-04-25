import { gql } from '@apollo/client';

const GET_ORDER = gql`
  query {
    order(id: "167", idType: DATABASE_ID) {
      billing {
        address1
        city
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      lineItems {
        nodes {
          total
          product {
            image {
              sourceUrl
            }
            name
          }
          quantity
        }
      }
      total
      subtotal
      shippingTotal
      paymentMethodTitle
    }
  }
`;

export default GET_ORDER;
