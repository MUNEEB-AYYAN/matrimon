import React from 'react';

const Contactus = () => {
  return (
    <div className="min-h-[80vh] px-5 py-10 max-w-3xl mx-auto text-gray-700 font-sans">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-10">Contact Us</h1>

      <div className="mb-6 p-6 border border-pink-100 rounded-lg bg-pink-50 shadow-sm">
        <h2 className="text-xl font-semibold text-pink-600 mb-2">Email</h2>
        <p className="mb-1">For general inquiries:</p>
        <p>
          <a href="mailto:info@nikahforever.com" className="text-pink-600 hover:underline font-medium">
            info@nikahforever.com
          </a>
        </p>
      </div>

      <div className="mb-6 p-6 border border-pink-100 rounded-lg bg-pink-50 shadow-sm">
        <h2 className="text-xl font-semibold text-pink-600 mb-2">Support</h2>
        <p className="mb-1">Need help with your account?</p>
        <p>
          <a href="mailto:support@nikahforever.com" className="text-pink-600 hover:underline font-medium">
            support@nikahforever.com
          </a>
        </p>
      </div>

      <div className="mb-6 p-6 border border-pink-100 rounded-lg bg-pink-50 shadow-sm">
        <h2 className="text-xl font-semibold text-pink-600 mb-2">Phone</h2>
        <p className="mb-1">Monday to Friday, 9am to 5pm</p>
        <p>
          <a href="tel:+11234567890" className="text-pink-600 hover:underline font-medium">
            +1 (123) 456-7890
          </a>
        </p>
      </div>

      <div className="p-6 border border-pink-100 rounded-lg bg-pink-50 shadow-sm">
        <h2 className="text-xl font-semibold text-pink-600 mb-2">Office Address</h2>
        <p>123 Islamic Way</p>
        <p>Muslim Town, 10001</p>
        <p>United States</p>
      </div>
    </div>
  );
};

export default Contactus;
