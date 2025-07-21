import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-[80vh] max-w-4xl mx-auto px-4 py-10 text-gray-700 font-sans">
      <h1 className="text-4xl text-center font-bold text-pink-600 mb-8">About NikahForever</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Our Mission</h2>
        <p>
          At NikahForever, we are committed to helping Muslim singles find their life partners
          through a halal and meaningful process. Our platform is designed with Islamic values at its core.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Who We Are</h2>
        <p>
          Founded in 2020, NikahForever has become one of the most trusted Muslim matrimonial services.
          Our team consists of dedicated professionals who understand the importance of marriage in Islam.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">Our Approach</h2>
        <p>
          We combine traditional Islamic values with modern technology to create a safe and effective platform
          for finding your perfect match. Every profile is manually verified to ensure authenticity.
        </p>
      </div>

      <p className="mt-6">
        Have questions?{' '}
        <Link
          to="/contact"
          className="text-pink-600 font-medium hover:underline transition duration-200"
        >
          Contact us
        </Link>{' '}
        anytime
      </p>
    </div>
  );
};

export default AboutPage;
