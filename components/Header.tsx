
import React from 'react';

const Header: React.FC = () => (
  <header className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md">
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Web-Based Career Assessment Tool
      </h1>
      <p className="mt-2 text-lg text-cyan-100">
        Helping students discover their ideal career paths with AI
      </p>
    </div>
  </header>
);

export default Header;
