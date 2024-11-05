const apiKey = '4A10767972C8FFA2EC41A449AB06EB22'; 
import { gameIds } from './gameIds.js';
let currentGameIndex = 0; 
let favoritesIndex = 0;
const favorites = []; 


async function getGameData(appId) {
    try {
        const apiUrl = `http://localhost:3000/api/games/${appId}`; 
        const detailsResponse = await fetch(apiUrl);
        const detailsData = await detailsResponse.json();

        if (detailsData[appId].success) {
            let gameData = detailsData[appId].data;
            let wallpaperUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
            let price = gameData.price_overview ? gameData.price_overview.final / 100 : 0; 

            // make the card
            const cardStyle = `
                <div class="outercard" style="background-image: url(${wallpaperUrl});">
                    <div class="thiscard">
                        <div></div>
                        <div class="secondofcard">
                            <h1>${gameData.name}</h1>
                            <p>${gameData.short_description}</p>
                            <p>Price: $${price.toFixed(2)}</p> <!-- Optional price display -->
                        </div>
                    </div>
                </div>
            `;

            const cardholder = document.querySelector('.card-Holder');
            cardholder.innerHTML = cardStyle;
        } else {
            console.error("Game data not found:", detailsData);
        }
    } catch (error) {
        console.error("Error fetching game data:", error);
    }
}
async function showNextGame() {
    if (currentGameIndex < gameIds.length) {
        await getGameData(gameIds[currentGameIndex]);
        console.log(`Fetching game data for ID: ${gameIds[currentGameIndex]}`); // Debug log
        currentGameIndex++;
    } else {
        console.log("No more games to show.");
    }
}
// Like button 
document.getElementById('likeButton').addEventListener('click', () => {
    const likedGameId = gameIds[currentGameIndex-1];
    if (!favorites.includes(likedGameId)) {
        favorites.push(likedGameId);
        displayLiked(favorites[favoritesIndex-1]);
        favoritesIndex++;
        console.log(`Game ${likedGameId} added to favorites.`);
    } else {
        console.log(`Game ${likedGameId} is already in favorites.`);
    }
    
    showNextGame();
});
// Skip button 
document.getElementById('skipButton').addEventListener('click', () => {
    currentGameIndex++; 
    showNextGame(); // Show the next game
});
showNextGame();
let _show = false;
document.querySelector(".stats").addEventListener('click', function (){
    
    console.log("clicked the display liked button!!!");
    if(!_show){
        document.getElementById("cont").style.display = "grid";
        _show = true;
    }else{
        document.getElementById("cont").style.display = "none";
        _show = false;
    }

});

async function displayLiked(appId){
        const apiUrl = `http://localhost:3000/api/games/${appId}`; 
        const detailsResponse = await fetch(apiUrl);
        const detailsData = await detailsResponse.json();
        let gameData = detailsData[appId].data;
        let wallpaperUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
        let price = gameData.price_overview ? gameData.price_overview.final / 100 : 0; 
        if(price===0){
            price = "Free";
        }else{
            price = price.toFixed(2);
        }
        let inStuff = `
                    <div class="outercardgrid" style="background-image: url(${wallpaperUrl});">
                        <div class="thiscard">
                            <div></div>
                            <div class="secondofcard">
                                <h1>${gameData.name}</h1>
                                <p>${gameData.short_description}</p>
                                <p>Price: $${price}</p> <!-- Optional price display -->
                            </div>
                        </div>
                    </div>
        `;
        let newGame = document.createElement('div');
        newGame.classList.add("disGRid");
        newGame.innerHTML = inStuff;
        const cont = document.querySelector(".container");
        cont.appendChild(newGame);
}