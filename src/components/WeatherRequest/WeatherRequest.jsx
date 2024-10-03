import { useEffect, useState } from 'react';
import { getWeatherFromCity } from '../../services/weather.service';
import Spinner from '../Spinner/Spinner';

const WeatherRequest = ({ city }) => {

    const [result, setResult] = useState({
        isLoading: false,
        data: null,
        error: null,
    });

    useEffect(() => {
        setResult({
            isLoading: true,
            data: null,
            error: null
        });

        getWeatherFromCity(city)
            .then(data => {
                setResult({
                    isLoading: false,
                    data,
                    error: null
                });
            })
            .catch(error => {
                setResult({
                    isLoading: false,
                    data: null,
                    error: error?.message ?? '¯\_(ツ)_/¯'
                });
            });
    }, [city]);

    return (
        <>
        {result.isLoading ? (
            <Spinner />
        ) : result.data ? (
            <WeatherResult {...result.data} />
        ) : (
            <WeatherError message={result.error} />
        )}
        </>
    );
};

const WeatherResult = ({ city, country, temp, tempFeels, description, icon }) => {
    return (
        <div>
            <p>{city} ({country})</p>
            <p>Temperature : {temp}°c ({tempFeels}°c)</p>
            <p>Description : {description}</p>
            <img src={icon} alt={'Icon pour ' + description} />
        </div>
    )
};

const WeatherError = ({ message }) => {
    return (
        <div>
            <p>Erreur : {message}</p>
        </div>
    );
};

export default WeatherRequest;