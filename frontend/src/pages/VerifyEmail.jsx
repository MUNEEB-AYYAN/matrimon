// src/pages/VerifyEmail.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying...');
  const token = searchParams.get('token');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`/api/auth/verify-email?token=${token}`);
        setMessage(res.data.message || 'Email verified successfully!');
      } catch (err) {
        setMessage('Invalid or expired verification link.');
      }
    };

    if (token) verify();
    else setMessage('Invalid verification token');
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
