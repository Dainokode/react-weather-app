import { useState } from "react";
import Card from "./Card";

const FetchData = () => {
    const [cityName, setCityName] = useState("London");
    const [cityDets, setCityDets] = useState();
    const [weatherDets, setWeatherDets] = useState();
    const [isPending, setIsPending] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();

        const APIKEY = "V0XnQzwi1sGX9UNKiKlfEOwAd17NAbAs";

        const fetchCity = async (city) => {        
            // City endpoint
            const cityURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKEY}&q=${cityName}`;
        
            const response = await fetch(cityURL);
            const data = await response.json();
            return data[0];
        }

        const fetchWeather = async (key) => {
            // Weather endpoint
            const weatherURL = `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${APIKEY}`;

            const response = await fetch(weatherURL);
            const data = await response.json();
            return data[0];
        }

        fetchCity(cityName)
        .then(data => {
            setCityDets(data);
            return fetchWeather(data.Key);
        })
        .then(data => {
            setIsPending(false);
            setWeatherDets(data);
        })
        .catch(err => console.log(err.message));
    }

    return ( 
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <label>Enter location name for weather information</label>
                <input type="text" onChange={(e) => setCityName(e.target.value)} />
            </form>
            {isPending ? <div></div> : <Card cityDets={cityDets} weatherDets={weatherDets} isPending={isPending} />}
        </div>
     );
}
 
export default FetchData;