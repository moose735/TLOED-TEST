import React from 'react';

function Header() {
  return (
    <header className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 mb-8 text-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Fantasy League Hub</h1>
      <p className="text-xl text-gray-600">Your one-stop shop for all league stats and fun!</p>
    </header>
  );
}

export default Header;
