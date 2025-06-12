import React from 'react';

function HistoryPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Team History</h2>
      <p className="text-gray-700">Dive into the historical performance of each team.</p>
      <p className="text-sm text-gray-500 mt-2">
        (e.g., year-by-year standings, playoff appearances, head-to-head records)
      </p>
      {/* This will involve fetching roster history, matchups, etc. */}
    </div>
  );
}

export default HistoryPage;
