import axios from 'axios';

export const fetchWeatherAPI = (location) => {
    const WEATHER_API_URL = `https://wttr.in/${location}?format=j1`;
    return axios.get(WEATHER_API_URL);
};
