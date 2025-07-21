import React from 'react';

const ServicePage = () => {
  const services = [
    {
      title: 'Personalized Matchmaking',
      description:
        'Our expert team provides one-on-one matchmaking based on your preferences, background, and goals.',
    },
    {
      title: 'Verified Profiles',
      description:
        'Every profile goes through a strict verification process to ensure authenticity and safety for our members.',
    },
    {
      title: 'Privacy Protection',
      description:
        'We prioritize your privacy with features like photo visibility controls and secure communication.',
    },
    {
      title: 'Assisted Matrimony Services',
      description:
        'Our relationship managers assist you throughout your matchmaking journey — from finding a match to wedding planning.',
    },
    {
      title: 'Mobile App Access',
      description:
        'Use our intuitive mobile app to browse, chat, and connect with potential matches anytime, anywhere.',
    },
    {
      title: 'Cultural & Community-Based Matches',
      description:
        'Easily filter and find matches based on religion, language, caste, and region.',
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 sm:px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-center text-rose-600 mb-12">
        Our Matrimonial Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border-t-4 border-rose-500 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-rose-700">{service.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
