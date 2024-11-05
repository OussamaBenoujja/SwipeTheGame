import express from 'express';
import fetch from 'node-fetch'; 
import cors from 'cors';
const app = express();
const port = 3000; 
const apiKey = '4A10767972C8FFA2EC41A449AB06EB22';


app.use(cors());

app.get('/api/games/:appId', async (req, res) => {
    const appId = req.params.appId;
    const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching game data:", error); 
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
