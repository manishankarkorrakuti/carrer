
import React from 'react';

interface NavProps {
  activeView: 'student' | 'admin';
  setView: (view: 'student' | 'admin') => void;
}

const Nav: React.FC<NavProps> = ({ activeView, setView }) => {
  const baseClasses = "px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-teal-500";
  const activeClasses = "bg-teal-600 text-white shadow-sm";
  const inactiveClasses = "bg-white text-gray-600 hover:bg-gray-200";

  return (
    <nav className="bg-gray-200 p-2">
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => setView('student')}
          className={`${baseClasses} ${activeView === 'student' ? activeClasses : inactiveClasses}`}
        >
          Student
        </button>
        <button
          onClick={() => setView('admin')}
          className={`${baseClasses} ${activeView === 'admin' ? activeClasses : inactiveClasses}`}
        >
          Admin
        </button>
      </div>
    </nav>
  );
};

export default Nav;
