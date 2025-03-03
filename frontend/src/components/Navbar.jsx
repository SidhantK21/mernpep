import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition duration-300">
          Hospital App
        </Link>
        <div className="space-x-4">
          <Link to="/create" className="text-white hover:text-blue-200 transition duration-300">
            Create Hospital
          </Link>
          <Link to="/hospitals" className="text-white hover:text-blue-200 transition duration-300">
            View Hospitals
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;