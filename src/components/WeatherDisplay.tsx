import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi';
import '../index.css';

const WeatherDisplay = () => {
    const [currentWeather, setCurrentWeather] = useState({
        temperature: '',
    });

    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const latitude = 42.9849;
        const longitude = -81.2453;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FToronto`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCurrentWeather({
                    temperature: `${data.current_weather.temperature}°C`,
                });

                const dailyForecasts = data.daily.time.slice(1, 4); // Get the next 3 days
                const forecasts = dailyForecasts.map((day: string, index: number) => ({ // Explicitly specify the type of 'day' as string
                    day,
                    maxTemp: data.daily.temperature_2m_max[index + 1], // Offset by 1 to skip today
                    minTemp: data.daily.temperature_2m_min[index + 1], // Offset by 1 to skip today
                }));

                setForecast(forecasts);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }, []);

    const getWeatherIcon = (maxTemp: number) => {
        // Example condition: adjust according to your needs
        if (maxTemp < 0) {
            return <WiCloudy className="text-2xl" />;
        } else if (maxTemp < 20) {
            return <WiRain className="text-2xl" />;
        } else {
            return <WiDaySunny className="text-2xl" />;
        }
    };

    return (
        <div className=" p-4 rounded-lg text-white">
            <h2 className="sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4">Weather in London, Ontario</h2>
            <p className="sm:text-2xl md:text-3xl lg:text-5xl">{currentWeather.temperature}</p>
            <div className="grid grid-cols-3 gap-4 font-bold sm:text-xl md:text-2xl lg:text-3xl">
                {forecast.map(({ day, maxTemp, minTemp }) => (
                    <div key={day} className="text-center sm:text-lg md:text-xl lg:text-2xl">
                        {getWeatherIcon(maxTemp)}
                        <p>{day}</p>
                        <p>{`Max: ${maxTemp}°C`}</p>
                        <p>{`Min: ${minTemp}°C`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherDisplay;
