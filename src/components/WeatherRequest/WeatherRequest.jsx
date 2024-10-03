import { useEffect, useState } from 'react';
import { getWeatherFromCity } from '../../services/weather.service';
import Spinner from '../Spinner/Spinner';
import { formatToCelsius } from '../../tools/formatter.tool';
import style from './WeatherRequest.module.css';

const WeatherRequest = ({ 
    city,
    btnAction = undefined,
    onAction = () => {},
}) => {

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

    const handleClick = () => {
        onAction(result.data.city);
    }

    return (
        <>
        {result.isLoading ? (
            <Spinner />
        ) : result.data ? (
            <div className={style.container}>
                <WeatherResult {...result.data} />
                { btnAction && <button type="button" onClick={handleClick}>{btnAction}</button> }
            </div>
        ) : (
            <WeatherError message={result.error} />
        )}
        </>
    );
};

const WeatherResult = ({ city, country, temp, tempFeels, description, icon }) => {

    return (
        <div className={style.result}>
            <p>{city} ({country})</p>
            <p>Temperature : {formatToCelsius(temp)} ({formatToCelsius(tempFeels)})</p>
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