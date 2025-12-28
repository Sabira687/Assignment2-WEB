document.getElementById('searchBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert('Please enter a city');

    const resultDiv = document.getElementById('result');
    const loader = document.getElementById('loader');

    loader.classList.remove('hidden');
    resultDiv.classList.add('hidden');

    try {
        const response = await fetch(`/api/weather?city=${city}`);
        const data = await response.json();

        if (data.error) throw new Error(data.error);

        document.getElementById('temp').textContent = Math.round(data.temperature);
        document.getElementById('desc').textContent = data.description;
        document.getElementById('feelsLike').textContent = data.feels_like;
        document.getElementById('wind').textContent = data.wind_speed;
        document.getElementById('rain').textContent = data.rain_3h;
        document.getElementById('coords').textContent = `${data.coordinates.lat}, ${data.coordinates.lon}`;

        document.getElementById('countryName').textContent = data.extra.country_name;
        document.getElementById('population').textContent = data.extra.population.toLocaleString();
        document.getElementById('currency').textContent = data.extra.currency;
        document.getElementById('flag').src = data.extra.flag;

        resultDiv.classList.remove('hidden');
    } catch (err) {
        alert(err.message);
    } finally {
        loader.classList.add('hidden');
    }
});