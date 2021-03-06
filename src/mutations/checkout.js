import gql from 'graphql-tag';

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($input: CheckoutInput!) {
    checkout(input: $input) {
      clientMutationId
      order {
        id
        databaseId
        paymentMethod
        total
        transactionId
        orderKey
        refunds {
          nodes {
            amount
          }
        }
        status
      }
      result
      redirect
    }
  }
`;

export default CHECKOUT_MUTATION;
