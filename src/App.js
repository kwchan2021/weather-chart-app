import "./App.css";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { GeoWeatherData } from "./GeoWeatherData";
import BarChart from "./components/BarChart";

function App() {

  // Static
  const cities = useMemo(() => ["Whitehorse", "Yellowknife", "Victoria", "Edmonton", "Regina", "Winnipeg", "Toronto", "Ottawa", "Montreal", "Quebec City", "Iqaluit", "Fredericton", "Halifax", "Charlottetown", "St. John's"], []);
  const [counter, setCounter] = useState(0);
  const [citiesTemperatureInfo, setCitiesTemperatureInfo] = useState([]);

  const loadWeatherData = useCallback(async (cityName) => {
    const data = await GeoWeatherData(cityName);
    setCitiesTemperatureInfo(prevInfo => [...prevInfo, {
      name: data.name,
      temperature: data.temperature,
    }]);
  }, []);

  // Equivalent
  // const loadWeatherDataMemo = useMemo(() => {
  //   return async (cityName) => {
  //     const data = await GeoWeatherData(cityName);
  //     setCitiesTemperatureInfo(prevInfo => [...prevInfo, {
  //       name: data.name,
  //       temperature: data.temperature,
  //     }]);
  //   };
  // }, []);

  const handleUpdateChart = useCallback(() => {
    setCounter(prevCounter => {
      if(cities[prevCounter] === undefined) {
        console.log("All items added");
        return prevCounter;
      }
      return prevCounter + 1;
    });
  }, [cities]);

  useEffect(() => {
    const cityName = cities[counter];
    loadWeatherData(cityName);
  }, [cities, counter, loadWeatherData]);

  const barChartData = useMemo(() => {
    return {
      labels: citiesTemperatureInfo.map((data) => data.name),
      datasets: [{
        label: "Cities' Temperature",
        data: citiesTemperatureInfo.map((data) => data.temperature),
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 99, 132, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: "black",
        borderWidth: 2
      }]
    };
  }, [citiesTemperatureInfo]);
  
  return (
    <div className="App">

      <button onClick={handleUpdateChart} className='btn'>Update Chart</button>
      <button className='btn'>Dark Mode</button>

      <div style={{ width: 1200}}>
        <BarChart chartData={barChartData} />
      </div>

    </div>
  );
}

export default App;
