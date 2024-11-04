const appId = 570;

async function getGameData(appId) {
  try {

    // Game Details
    const detailsResponse = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
    const detailsData = await detailsResponse.json();
    if (detailsData[appId].success) {
      console.log("Description:", detailsData[appId].data.short_description);
    }
    if (detailsData[appId].success) {
        console.log("GameName:", detailsData[appId].data.name);
      }
  
    // Player Count
    const playerCountResponse = await fetch(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`);
    const playerCountData = await playerCountResponse.json();
    console.log("Player Count:", playerCountData.response.player_count);
  } catch (error) {
    console.error("Error fetching game data:", error);
  }
}

getGameData(appId);
