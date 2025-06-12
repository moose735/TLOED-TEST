import { useState, useEffect } from 'react';

// Custom hook to fetch Sleeper API data
const useSleeperData = () => {
  const [leagueData, setLeagueData] = useState(null);
  const [historicalLeagueIds, setHistoricalLeagueIds] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingHistorical, setIsLoadingHistorical] = useState(false);

  const currentLeagueId = '1181984921049018368';
  const targetUsername = 'irwin35';
  const targetLeagueName = 'The League of Extraordinary Douchebags';

  useEffect(() => {
    const fetchLeagueDataAndHistory = async () => {
      setIsLoading(true);
      setError(null);
      let stableUserId = null;

      try {
        // Fetch current league details
        const leagueResponse = await fetch(`https://api.sleeper.app/v1/league/${currentLeagueId}`);
        if (!leagueResponse.ok) {
          throw new Error(`HTTP error! status: ${leagueResponse.status} for league ID ${currentLeagueId}`);
        }
        const currentLeagueDetails = await leagueResponse.json();
        setLeagueData(currentLeagueDetails);

        // --- Step 1: Get the user_id for 'irwin35' ---
        const userApiUrl = `https://api.sleeper.app/v1/user/${targetUsername}`;
        const userResponse = await fetch(userApiUrl);
        if (!userResponse.ok) {
          throw new Error(`HTTP error! status: ${userResponse.status} for username ${targetUsername}. Make sure the username is correct.`);
        }
        const userData = await userResponse.json();
        stableUserId = userData.user_id;
        console.log(`Found user_id for ${targetUsername}:`, stableUserId);

        if (stableUserId) {
          // --- Step 2: Dynamically fetch historical league IDs until no more are found ---
          setIsLoadingHistorical(true);
          const newHistoricalIds = {};
          let year = new Date().getFullYear();
          let foundLeagueForYear = true;
          const minYear = 2010; // Prevent infinite loops if league name is not found, adjust as needed

          // Loop backwards through years until the league is no longer found or we hit a minimum year
          while (foundLeagueForYear && year >= minYear) {
            const userLeaguesApiUrl = `https://api.sleeper.app/v1/user/${stableUserId}/leagues/nfl/${year}`;
            const historyResponse = await fetch(userLeaguesApiUrl);

            if (!historyResponse.ok) {
              console.warn(`Could not fetch leagues for user ${stableUserId} in ${year}. Status: ${historyResponse.status}. Assuming end of history or API error.`);
              foundLeagueForYear = false; // Stop if there's an error or no leagues for this year
              break; // Exit the loop
            }

            const userLeaguesForSeason = await historyResponse.json();
            
            // Attempt to find your specific league by name
            const yourHistoricalLeague = userLeaguesForSeason.find(
              (league) => league.name === targetLeagueName
            );

            if (yourHistoricalLeague) {
              newHistoricalIds[year] = yourHistoricalLeague.league_id;
              year--; // Move to the previous year
            } else {
              console.log(`Could not find a league named "${targetLeagueName}" for season ${year} for user ${stableUserId}. Assuming start of league history found.`);
              foundLeagueForYear = false; // Stop if the league is not found
            }
          }
          // Sort the historical IDs by year in ascending order for display
          const sortedHistoricalIds = Object.keys(newHistoricalIds)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .reduce((acc, key) => {
              acc[key] = newHistoricalIds[key];
              return acc;
            }, {});

          setHistoricalLeagueIds(sortedHistoricalIds);
          setIsLoadingHistorical(false);
        } else {
          console.warn('Could not retrieve user ID for the specified username.');
          setIsLoadingHistorical(false);
        }

      } catch (e) {
        setError(e.message);
        console.error('Failed to fetch data:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeagueDataAndHistory();
  }, [currentLeagueId, targetUsername, targetLeagueName]); // Dependencies for useEffect

  return {
    leagueData,
    historicalLeagueIds,
    isLoading,
    isLoadingHistorical,
    error,
    currentLeagueId,
    targetUsername,
    targetLeagueName,
  };
};

export default useSleeperData;
