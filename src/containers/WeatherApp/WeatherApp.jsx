import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import WeatherRequest from '../../components/WeatherRequest/WeatherRequest';

const WeatherApp = () => {

    const [currentCity, setCurrentCity] = useState(null);

    const handleCitySearch = (city) => {
        setCurrentCity(city);
    }

    const handleSaveWeather = (cityToSave) => {
        console.log("Ca marche ?", cityToSave);
    }

    return (
        <>
            <h1>Application de météo</h1>
            <h2>Rechercher une ville : </h2>
            <SearchBar placeholder='Bruxelles' onSearch={handleCitySearch} />

            <h2>Resultat</h2>
            {currentCity && (
                <WeatherRequest city={currentCity} 
                    btnAction='💚'
                    onAction={handleSaveWeather}/>
            )}
        </>
    );
};

export default WeatherApp;