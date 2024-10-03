import axios from 'axios';

export const WEATHER_ICON_URL = `https://openweathermap.org/img/wn/__icon__@2x.png` 

export async function getWeatherFromCity(city) {

    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: import.meta.env.VITE_WEATHER_API_KEY,
            units: 'metric',
            lang: 'fr'
        }
    });

    return {
        city: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        tempFeels : response.data.main.feels_like,
        description : response.data.weather[0].description,
        icon : WEATHER_ICON_URL.replace('__icon__', response.data.weather[0].icon)
    };
};