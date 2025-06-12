import React from 'react';

function RecordsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">League Records</h2>
      <p className="text-gray-700">This section will display all-time league records.</p>
      <p className="text-sm text-gray-500 mt-2">
        (e.g., highest single-game score, longest winning streak, most championships)
      </p>
      {/* You'll populate this with data fetched from various Sleeper APIs and Google App Scripts */}
    </div>
  );
}

export default RecordsPage;
