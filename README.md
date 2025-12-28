# Weather & Country Info API

A Node.js application that provides real-time weather data and country information using server-side API integration.

## Setup Instructions
1. Start the server: `node server.js`
2. Open `http://localhost:3000` in your browser.

## API Usage
- **OpenWeather API**: Used to fetch temperature, wind speed, and rain volume.
- **RestCountries API**: Used to fetch country name, population, and currency based on the location.

## Key Design Decisions
- **Separation of Concerns**: The frontend only communicates with our local server, keeping API keys secure.
- **Error Handling**: The server returns a 500 status code with a clear message if the city is not found.
- **Responsive UI**: CSS Grid and Media Queries are used to ensure the app works on mobile devices.
