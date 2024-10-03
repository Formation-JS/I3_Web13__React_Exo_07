import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import WeatherRequest from '../../components/WeatherRequest/WeatherRequest';

const WeatherApp = () => {

    const [currentCity, setCurrentCity] = useState(null);
    const [savedCities, setSavedCities] = useState([]);

    const handleCitySearch = (city) => {
        setCurrentCity(city);
    }

    const handleSaveWeather = (cityToSave) => {
        if(!savedCities.includes(cityToSave)) {
            // Ajout en premier
            setSavedCities(cities => [cityToSave, ...cities])

            // Ajout en dernier
            // setSavedCities(cities => [...cities, cityToSave]);

            // Version avec la méthode "concat"
            // setSavedCities(cities => cities.concat(cityToSave));
        }
    }

    const handleDeleteWeather = (cityToDelete) => {
        setSavedCities(cities => cities.filter(city => city !== cityToDelete))
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

            <h2>Les villes favorites</h2>
            {savedCities.map((city) => (
                <WeatherRequest key={city}
                    city={city}
                    btnAction='💀'
                    onAction={handleDeleteWeather} />
            ))}
        </>
    );
};

export default WeatherApp;