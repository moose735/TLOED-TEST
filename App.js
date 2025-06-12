import React, { useState, useEffect } from 'react';

// Main App component for your fantasy league website
function App() {
  // State to hold the fetched league data
  const [leagueData, setLeagueData] = useState(null);
  // State to hold any errors during data fetching
  const [error, setError] = useState(null);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // State for navigation (using a simple state variable instead of react-router)
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'records', 'history', 'odds'

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch Sleeper league data
    const fetchSleeperLeagueData = async () => {
      // Replace 'YOUR_LEAGUE_ID' with your actual Sleeper League ID
      const leagueId = '1181984921049018368';
      const apiUrl = `https://api.sleeper.app/v1/league/${leagueId}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          // If the response is not OK (e.g., 404, 500), throw an error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLeagueData(data); // Set the fetched data to state
        console.log('Sleeper League Data:', data); // Log the data for debugging
      } catch (e) {
        // Catch any errors during the fetch operation
        setError(e.message);
        console.error('Failed to fetch Sleeper League data:', e);
      } finally {
        // Set loading to false once the fetch operation is complete
        setIsLoading(false);
      }
    };

    // Call the data fetching function
    fetchSleeperLeagueData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Helper function to render different sections based on currentPage state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-700">Loading fantasy data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500 text-lg">Error: {error}. Please check your League ID or network connection.</p>
        </div>
      );
    }

    // You can customize how you display leagueData here.
    // For now, let's display a simple message and the league name if available.
    switch (currentPage) {
      case 'home':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to your Fantasy League Hub!</h2>
            {leagueData ? (
              <p className="text-lg text-gray-700">
                You are currently viewing data for the league: <span className="font-semibold text-purple-700">{leagueData.name}</span>
              </p>
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
      case 'records':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">League Records</h2>
            <p className="text-gray-700">This section will display all-time league records.</p>
            {/* You'll populate this with data fetched from various Sleeper APIs and Google App Scripts */}
            <p className="text-sm text-gray-500 mt-2">
              (e.g., highest single-game score, longest winning streak, most championships)
            </p>
          </div>
        );
      case 'history':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Team History</h2>
            <p className="text-gray-700">Dive into the historical performance of each team.</p>
            {/* This will involve fetching roster history, matchups, etc. */}
            <p className="text-sm text-gray-500 mt-2">
              (e.g., year-by-year standings, playoff appearances, head-to-head records)
            </p>
          </div>
        );
      case 'odds':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Betting Odds (Fun Only!)</h2>
            <p className="text-gray-700">See the current "odds" for winning the league or specific matchups.</p>
            {/* This could be driven by custom logic in your Google App Script based on power rankings, etc. */}
            <p className="text-sm text-gray-500 mt-2">
              (e.g., championship odds, weekly matchup probabilities)
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 font-sans text-gray-900 flex flex-col items-center py-8">
      {/* Header Section */}
      <header className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Fantasy League Hub</h1>
        <p className="text-xl text-gray-600">Your one-stop shop for all league stats and fun!</p>
      </header>

      {/* Navigation */}
      {/* Added 'flex-wrap' and 'gap-2 sm:space-x-4' to ensure buttons wrap and space correctly on smaller screens */}
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

      {/* Main Content Area */}
      <main className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 flex-grow">
        {renderContent()}
      </main>

      {/* Footer (Optional) */}
      <footer className="w-full max-w-4xl text-center mt-8 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Fantasy League Hub. All rights reserved.</p>
        <p>Data provided by Sleeper API and custom Google App Scripts.</p>
      </footer>
    </div>
  );
}

export default App;
