import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { v4 } from 'uuid';
import WRITE_REVIEW from '../mutations/write-review';
import GET_REVIEWS from '../queries/get-reviews';
import { ErrorContext } from './context/ErrorContext';
import Loader from './Loader';
import StarRating from './StarRating';

export default function ProductReview({ id }) {
  const [reviews, setReviews] = useState([]);
  const [deskripsi, setDeskripsi] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [starValue, setStarValue] = useState([]);

  const { loading, error: errorFetchData, data, refetch } = useQuery(
    GET_REVIEWS,
    {
      variables: { id },
      notifyOnNetworkStatusChange: true,
      onCompleted: () => {
        setReviews(data?.product?.reviews?.nodes);
        setStarValue(data?.product?.reviews?.edges);
      },
      onError: (error) => {
        if (error) {
          const errorMessage = error?.graphQLErrors?.[0]?.message
            ? error.graphQLErrors[0].message
            : '';
          setError(errorMessage);
        }
      },
    }
  );

  const [
    writeReview,
    {
      data: writeReviewResponse,
      loading: writeReviewProcessing,
      error: writeReviewError,
    },
  ] = useMutation(WRITE_REVIEW, {
    onCompleted: () => {
      refetch();
      setNama('');
      setEmail('');
      setDeskripsi('');
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : '';
        setError(errorMessage);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    writeReview({
      variables: {
        input: {
          clientMutationId: v4(),
          rating: parseInt(rating),
          commentOn: id,
          author: nama,
          authorEmail: email,
          date: Date.now().toString(),
          content: deskripsi,
        },
      },
    });
  };

  console.log(reviews);
  console.log(starValue);

  return (
    <>
      {reviews.map((item, i) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b-2 py-4"
        >
          <div className="flex justify-center">
            <div className="bg-gray-400 w-16 h-16 flex justify-center items-center mr-4 text-3xl font-bold text-white">
              {item.author?.node?.name.split('')[0]}
            </div>
            <div>
              <h5 className="text-lg font-semibold">
                {item.author?.node?.name}
              </h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.content,
                }}
                className="max-w-4xl"
              />
              <p className="text-sm text-gray-400">{item.date}</p>
            </div>
          </div>
          <StarRating rating={starValue[i]?.rating} fixed />
        </div>
      ))}
      {loading ? <p>Loading...</p> : ''}
      <div>
        <div className="flex justify-between items-center mt-4">
          <p>Beri penilaian kamu: </p>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={deskripsi}
            onChange={(e) => {
              setDeskripsi(e.target.value);
            }}
            name="Deskripsi"
            id="deskripsi"
            className="w-full h-40 mt-4 border-2 rounded border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary px-2 focus:border-opacity-0"
          ></textarea>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nama">Nama</label>
              <input
                onChange={(e) => {
                  setNama(e.target.value);
                }}
                value={nama}
                type="text"
                className="h-8 w-full mt-4 rounded border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="h-8 w-full mt-4 rounded border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="py-1 px-10 mt-4 rounded text-white bg-primary hover:bg-yellow-500"
            >
              {writeReviewProcessing ? <Loader size={16} /> : 'Submit'}
            </button>
            <span className="ml-4 text-red-500">{error}</span>
          </div>
        </form>
      </div>
    </>
  );
}
