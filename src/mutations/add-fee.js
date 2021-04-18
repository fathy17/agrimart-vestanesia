import gql from 'graphql-tag';

const ADD_FEE_MUTATION = gql`
  mutation ADD_FEE_MUTATION($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      clientMutationId
      customer {
        shipping {
          country
          state
          email
          city
        }
      }
    }
  }
`;

export default ADD_FEE_MUTATION;
