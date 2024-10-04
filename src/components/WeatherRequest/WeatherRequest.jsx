import { useEffect, useState } from 'react';
import { getWeatherFromCity } from '../../services/weather.service';
import Spinner from '../Spinner/Spinner';
import { formatToCelsius } from '../../tools/formatter.tool';
import style from './WeatherRequest.module.css';
import useSWR from 'swr';

const WeatherRequest = ({ 
    city,
    btnAction = undefined,
    onAction = () => {},
}) => {

    const { isLoading, data, error } = useSWR(city, getWeatherFromCity);

    const handleClick = () => {
        onAction(data.city);
    }

    return (
        <>
        {isLoading ? (
            <Spinner />
        ) : data ? (
            <div className={style.container}>
                <WeatherResult {...data} />
                { btnAction && <button type="button" onClick={handleClick}>{btnAction}</button> }
            </div>
        ) : (
            <WeatherError message={error?.message ?? '¯\_(ツ)_/¯'} />
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