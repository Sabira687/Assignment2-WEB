require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const API_KEY = process.env.OPENWEATHER_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = weatherRes.data;

        const countryCode = data.sys.country;
        const countryRes = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const countryData = countryRes.data[0];

        const responseData = {
            temperature: data.main.temp,
            description: data.weather[0].description,
            coordinates: data.coord,
            feels_like: data.main.feels_like,
            wind_speed: data.wind.speed,
            country_code: countryCode,
            rain_3h: data.rain ? data.rain['3h'] || 0 : 0,
            extra: {
                country_name: countryData.name.common,
                population: countryData.population,
                currency: Object.values(countryData.currencies)[0].name,
                flag: countryData.flags.png
            }
        };

        res.json(responseData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data. Check city name.' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));