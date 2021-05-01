import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { ErrorContext } from './context/ErrorContext';
import REGISTER_CUSTOMER_MUTATION from '../mutations/register-customer';
import Loader from './Loader';

export default function RegisterCustomerForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    billing: { phone: '' },
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const [
    register,
    { data: registerResponse, loading: registerLoading },
  ] = useMutation(REGISTER_CUSTOMER_MUTATION, {
    variables: {
      input: form,
    },
    onCompleted: () => {
      setMessage(
        'Selamat! anda telah terdaftar sebagai member Vestanesia Agrimart.'
      );
    },
    onError: (error) => {
      if (error) {
        setError(true);
        setMessage(error?.graphQLErrors?.[0]?.message);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };
  return (
    <div className="col-span-3">
      <form onSubmit={handleSubmit} className="flex flex-col mb-4">
        <div className="mb-4">
          <label htmlFor="nama-lengkap">Nama Lengkap</label>
          <input
            className="h-8 w-full rounded border-2 border-gray-500 bg-primary bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
            type="text"
            onChange={(e) =>
              setForm({
                ...form,
                firstName: e.target.value.split(' ')?.[0],
                lastName: e.target.value.split(' ')?.[1],
              })
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            className="h-8 w-full rounded border-2 border-gray-500 bg-primary bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone-number">No. Handphone</label>
          <input
            className="h-8 w-full rounded border-2 border-gray-500 bg-primary bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
            type="text"
            onChange={(e) =>
              setForm({ ...form, billing: { phone: e.target.value } })
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="alasan">Alasan bergabung menjadi member</label>
          <textarea
            className="h-16 w-full rounded border-2 border-gray-500 bg-primary bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-primary px-2 block focus:border-opacity-0"
            type="text"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="self-end rounded bg-primary py-1 px-4 text-white hover:bg-yellow-500"
        >
          {registerLoading ? <Loader size={16} /> : 'Daftar'}
        </button>
      </form>
      {message && (
        <div
          className={`w-full flex items-center justify-center py-3 rounded-lg text-white text-center font-semibold ${
            error ? 'bg-yellow-500' : 'bg-primary'
          }`}
        >
          <p className="text-lg">{message}</p>
        </div>
      )}
    </div>
  );
}
