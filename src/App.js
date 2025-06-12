import React, { useState } from 'react';
import useSleeperData from './hooks/useSleeperData.js'; // Import the custom hook

// Import page components
import Header from './components/Header.js';
import Navigation from './components/Navigation.js';
import HomePage from './components/HomePage.js';
import RecordsPage from './components/RecordsPage.js';
import HistoryPage from './components/HistoryPage.js';
import OddsPage from './components/OddsPage.js';

function App() {
  // State for navigation (using a simple state variable instead of react-router)
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'records', 'history', 'odds'

  // Use the custom hook to fetch all Sleeper data
  const {
    leagueData,
    historicalLeagueIds,
    isLoading,
    isLoadingHistorical,
    error,
    currentLeagueId,
    targetUsername,
    targetLeagueName
  } = useSleeperData();

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
        <div className="flex justify-center items-center h-full text-center">
          <p className="text-red-500 text-lg">Error: {error}. Please check your League ID, username, or network connection.</p>
          <p className="text-gray-600 mt-2">If you consistently get this error, ensure the `currentLeagueId`, `targetUsername`, and `targetLeagueName` are correct and the Sleeper API is accessible.</p>
        </div>
      );
    }

    // Pass data and state to the respective page components
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            leagueData={leagueData}
            historicalLeagueIds={historicalLeagueIds}
            isLoadingHistorical={isLoadingHistorical}
            currentLeagueId={currentLeagueId}
            targetUsername={targetUsername}
            targetLeagueName={targetLeagueName}
          />
        );
      case 'records':
        return <RecordsPage />; // Placeholder for now
      case 'history':
        return <HistoryPage />; // Placeholder for now
      case 'odds':
        return <OddsPage />; // Placeholder for now
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 font-sans text-gray-900 flex flex-col items-center py-8">
      <Header />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

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
