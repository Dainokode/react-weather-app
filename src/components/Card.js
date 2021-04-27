import day from "./images/day.jpg";
import night from "./images/night.jpg";

const Card = ({ cityDets, weatherDets, isPending }) => {
    return ( 
        <>
        {isPending || !cityDets || !weatherDets ? <div>Loading...</div> : 
        <div className="card">
        <div className="card-image">
            {weatherDets.IsDayTime ? <img src={day} alt="" /> : <img src={night} alt="day or night" />}
        </div>
        <div className="card-icon">
            <img src={`icons/${weatherDets.WeatherIcon}.svg`} alt="weather icon" />
        </div>
        <div className="card-text">
            <h2 className="city">{cityDets.EnglishName}</h2>
            <small className="condition">{weatherDets.WeatherText}</small>
            <h1 className="temp">{Math.ceil(weatherDets.Temperature.Metric.Value)}°C</h1>
        </div>
        </div>}
        </>
     );
}
 
export default Card;