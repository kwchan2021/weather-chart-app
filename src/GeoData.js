export async function GeoData(city){

    let API_key = 'API_KEY';
    const link = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_key}`

    const res = await fetch(link);
    const data = await res.json();
    
    return data;
}
