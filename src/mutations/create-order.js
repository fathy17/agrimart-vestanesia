import gql from 'graphql-tag';

const CREATE_ORDER_MUTATION = gql`
  mutation CHECKOUT_MUTATION($input: CreateOrderInput!) {
    createOrder(input: $input) {
      clientMutationId
      orderId
      order {
        total
        subtotal
        discountTotal
      }
    }
  }
`;

export default CREATE_ORDER_MUTATION;
