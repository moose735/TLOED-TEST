import React from 'react';

function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 mb-8 flex flex-wrap justify-center gap-2 sm:space-x-4">
      <button
        onClick={() => setCurrentPage('home')}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300
          ${currentPage === 'home' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900'}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
      >
        Home
      </button>
      <button
        onClick={() => setCurrentPage('records')}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300
          ${currentPage === 'records' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900'}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
      >
        Records
      </button>
      <button
        onClick={() => setCurrentPage('history')}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300
          ${currentPage === 'history' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900'}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
      >
        Team History
      </button>
      <button
        onClick={() => setCurrentPage('odds')}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300
          ${currentPage === 'odds' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900'}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
      >
        Betting Odds
      </button>
    </nav>
  );
}

export default Navigation;
