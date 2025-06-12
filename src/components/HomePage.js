import React from 'react';

function HomePage({ leagueData, historicalLeagueIds, isLoadingHistorical, currentLeagueId, targetUsername, targetLeagueName }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to your Fantasy League Hub!</h2>
      {leagueData ? (
        <>
          <p className="text-lg text-gray-700 mb-2">
            You are currently viewing data for the league: <span className="font-semibold text-purple-700">{leagueData.name}</span>
          </p>
          <p className="text-md text-gray-600">
            Current League ID: <span className="font-mono text-sm bg-gray-100 p-1 rounded">{currentLeagueId}</span>
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Historical League IDs for "{targetLeagueName}" (via {targetUsername}):</h3>
          {isLoadingHistorical ? (
            <p className="text-gray-600">Fetching historical IDs from beginning of time...</p>
          ) : (
            <ul>
              {Object.keys(historicalLeagueIds).length > 0 ? (
                Object.entries(historicalLeagueIds).map(([season, id]) => (
                  <li key={season} className="mb-1 text-gray-700">
                    <span className="font-semibold">{season}:</span> <span className="font-mono text-sm bg-gray-100 p-1 rounded">{id}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No historical league IDs found or an issue occurred during fetch.</p>
              )}
            </ul>
          )}
          <p className="mt-4 text-gray-600">
            <strong className="text-blue-600">Note:</strong> The historical IDs are now dynamically pulled year-by-year using the username "{targetUsername}" and filtered by the league name "{targetLeagueName}", going back to the earliest season found for this user and league name combination.
          </p>
        </>
      ) : (
        <p className="text-lg text-gray-700">No league data available yet. Check back soon!</p>
      )}
      <p className="mt-4 text-gray-600">
        Use the navigation above to explore records, history, and more.
      </p>
      {/* Example of displaying raw data (for development/debugging) */}
      {/* {leagueData && <pre className="mt-4 p-4 bg-gray-100 rounded-md text-sm overflow-auto max-h-96">{JSON.stringify(leagueData, null, 2)}</pre>} */}
    </div>
  );
}

export default HomePage;
