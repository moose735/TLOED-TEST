import React from 'react';

function OddsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Betting Odds (Fun Only!)</h2>
      <p className="text-gray-700">See the current "odds" for winning the league or specific matchups.</p>
      <p className="text-sm text-gray-500 mt-2">
        (e.g., championship odds, weekly matchup probabilities)
      </p>
      {/* This could be driven by custom logic in your Google App Script based on power rankings, etc. */}
    </div>
  );
}

export default OddsPage;
