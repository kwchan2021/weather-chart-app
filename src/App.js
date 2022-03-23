import './App.css';
import { useEffect, useState } from "react";
import { GeoWeatherData } from "./GeoWeatherData";
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DoughnutChart from './components/DoughnutChart';
import { UserData } from './Data'

function App() {

  const [trigger, setTrigger] = useState(0);
  const cities_list = ['Whitehorse', 'Yellowknife', 'Victoria', 'Edmonton', 'Regina', 'Winnipeg', 'Toronto', 'Quebec City', 'Iqaluit', 'Fredericton', 'Halifax', 'Charlottetown', 'St. John\'s'];
  const [citiesTemperatureInfoList, setCitiesTemperatureInfoList] = useState([]);
  const [cities_list_counter, setCities_list_counter] = useState(0);

  const addCitiesInfo = async (cityName) => {
    try {
      const data = await GeoWeatherData(cityName)
      setCitiesTemperatureInfoList([...citiesTemperatureInfoList, {
        name: data.name,
        temperature: data.temperature,
      }])
      setCities_list_counter(cities_list_counter + 1);
    }catch(err){
      console.error(err);
    }
  }

  // Bar Chart
  const [cityTemperatureData, setCityTemperatureData] = useState({
    labels: citiesTemperatureInfoList.map((data) => data.name),
    datasets: [{
      label: "Cities' Temperature",
      data: citiesTemperatureInfoList.map((data) => data.temperature),
      backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
      borderColor: 'black',
      borderWidth: 2
    }]
  })
  // Bar Chart

  // Re-render Bar Chart
  const updataBarChart = () => {
    setCityTemperatureData({
      labels: citiesTemperatureInfoList.map((data) => data.name),
      datasets: [{
        label: "Cities' Temperature",
        data: citiesTemperatureInfoList.map((data) => data.temperature),
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: 'black',
        borderWidth: 2
      }]
    })
  }
  // Re-render Bar Chart


  useEffect(() => {
    if(citiesTemperatureInfoList.length < cities_list.length){
      addCitiesInfo(cities_list[cities_list_counter]);
      updataBarChart();
      console.log(citiesTemperatureInfoList);
    }
    else{
      console.log("All items added")
    }
  }, [trigger])

  return (
    <div className="App">

      <button onClick={() => setTrigger({ cities_list_counter })} className='btn'>Update Chart</button>

      <div style={{ width: 1200}}>
       <BarChart chartData={cityTemperatureData} />
      </div>

    </div>
  );
}

export default App;
