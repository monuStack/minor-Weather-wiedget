import SearchAppBar from "./AppBar";
import SunnyIcon from "@mui/icons-material/Sunny";
import AirIcon from "@mui/icons-material/Air";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WaterIcon from "@mui/icons-material/Water";
import { useState } from "react";

export default function WeatherApp() {
  let parentStyle = {
    width: "100%",
    height: "100%",
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  };
  let weatherData = {
    // border: "1px solid black",
    display: "flex",
    gap: 10,
  };

  let Data = {
    width: "100px",
    height: "100px",
    border: "1px solid black",
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  let [location, setLocation] = useState(""); //for store input location
  let [weather, setWeather] = useState({});


  let URL = `http://api.weatherapi.com/v1/current.json?key=1f53b42c204144f1960131206261310&q=${location}&aqi=yes`;

  function locationFun(e) {
    let currlocation = e.target.value;
    setLocation(currlocation);
  }

  async function weatherTrack() {
    let response = await fetch(URL);
    let data = await response.json();
    console.log(response);
    console.log(data);

    setWeather(data);

  }

  return (
    <>
      <SearchAppBar />
      <div style={parentStyle}>
        <p>Check Your City Weather </p>
        <input
          type="text"
          placeholder="enter your location"
          onChange={locationFun}
        />
        <button onClick={weatherTrack}>Search</button>
        <br />
        <br />

        <h5>Weather Details</h5>
        <div style={weatherData}>
          <p style={Data}>
            <SunnyIcon /> Temp 
            {weather.current && <p>{weather.current.heatindex_c}</p>}
          </p>
          <p style={Data}>
            <AirIcon /> Wind_mph
            
            {weather.current && <p>{weather.current.wind_kph}</p>}
          </p>
          <p style={Data}>
            <WaterIcon /> Humidity
            {weather.current && <p>{weather.current.humidity}</p>}
          </p>
          <p style={Data}>
            <ThunderstormIcon />
            Rain
            {weather.current && <p>{weather.current.chance_of_rain}</p>}
          </p>
        </div>
      </div>
    </>
  );
}
