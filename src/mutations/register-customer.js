import { gql } from '@apollo/client';

/**
 * GraphQL categories mutation.
 */
const REGISTER_CUSTOMER_MUTATION = gql`
  mutation($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      customer {
        username
        sessionToken
      }
    }
  }
`;

export default REGISTER_CUSTOMER_MUTATION;
