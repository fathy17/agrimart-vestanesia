import { gql } from '@apollo/client';

/**
 * GraphQL konsultasi query.
 */
const GET_KONSULTASI_QUERY = gql`
  query {
    extension(id: "custom", idType: SLUG) {
      konsultasi {
        deskripsi
        foto {
          sourceUrl
        }
        namaKonsultan
        noTelepon
      }
    }
  }
`;

export default GET_KONSULTASI_QUERY;
