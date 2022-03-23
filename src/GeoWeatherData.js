import { GeoData } from "./GeoData";
import { WeatherData } from "./WeatherData";

export async function GeoWeatherData(cityName){

    try{
        const geoData = await GeoData(cityName);
        const cityLat = geoData[0].lat;
        const cityLon = geoData[0].lon;

        const weatherData = await WeatherData(cityLat, cityLon)
        
        const finalCityName = weatherData.name.toUpperCase();
        const finalCityTemperature = Math.round(weatherData.main.temp);

        return {name: finalCityName, temperature: finalCityTemperature};

    }catch(err){
        console.error(err);
    }
    return "";
}