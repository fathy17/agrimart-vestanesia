import gql from 'graphql-tag';

const APPLY_COUPON_MUTATION = gql`
  mutation APPLY_COUPON_MUTATION($input: ApplyCouponInput!) {
    applyCoupon(input: $input) {
      clientMutationId
    }
  }
`;

export default APPLY_COUPON_MUTATION;
