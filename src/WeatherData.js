export async function WeatherData(lat, lon){

    let API_key = 'API_KEY';
    const link = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;
    const res = await fetch(link);
    const data = await res.json();
    
    return data;
}