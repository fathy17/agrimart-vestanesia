import gql from 'graphql-tag';

const WRITE_REVIEW = gql`
  mutation WRITE_REVIEW($input: WriteReviewInput!) {
    writeReview(input: $input) {
      clientMutationId
      rating
    }
  }
`;

export default WRITE_REVIEW;
