
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-shadow hover:shadow-xl">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-teal-200">
      {title}
    </h2>
    {children}
  </section>
);

export default Card;
