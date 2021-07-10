  
import React, { useEffect, useState } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDashboard, AiOutlineCloud, AiFillEye, AiOutlineSwap } from "react-icons/ai";
import { WiThermometer, WiStrongWind, WiThermometerInternal } from "react-icons/wi";

const api = {
  key: "56f5e6f96b876ed60f2717fd26dd3b1e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [display, setDisplay] = useState(false)
  const [searchDisplay, setSearchDisplay] = useState(false)
  const date = new Date()
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    fetch(`${api.base}weather?zip=11223&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
        });
  },[]) 

  const search = evt => {
    if (evt.key === "Enter") {
      if(parseInt(input) == input) {
        fetch(`${api.base}weather?zip=${input}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setInput('');
        });
      }else{
        fetch(`${api.base}weather?q=${input}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setInput('');
          });
      }
    }
  }

  const handleDisplay = () => {
    setDisplay(!display)
  }

  const handleSearchDisplay =() => {
    setSearchDisplay(!searchDisplay)
  }

  const handleOnchange = (e) => {
    setInput(e.target.value)
  }

  return (
        <div className="weather-page">
          <div className="header">
          <div className="header-location">
            <div className="location">
              {weather.name}
            </div>
              <div
                className="change-btn"
                onClick={() => handleSearchDisplay()}
                style={{ transform: searchDisplay ? "rotate(180deg)" : "rotate(0deg" }}
              >
                <AiOutlineSwap />
              </div>
          </div>
          <div
            className="location-input"
            style={{ height: searchDisplay ? "35px" : "0px" }}
          >
            <input
              value={input}
              onChange={(e) => handleOnchange(e)}
              onKeyPress={search}
              placeholder="please enter city name or zipcode"
            />
          </div>
          <div className="header-time">
            <div className="month-day">
              <div className="month">{months[date.getMonth()]}</div>
              <div className="day">{date.getDate()}</div>
            </div>
            <div className="week">{weekday[date.getDay()]}</div>
          </div>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div  className="weather-info"
                style={{ height: display ? "400px" : "242.5px" }}
          >
            <div className="main">
                <div className="main-logo">
                    <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} />
                </div>
                <div className="main-txt">{weather.weather[0].main}</div>
              </div>
              <div className="tmp">
                <div className="now-tmp">
                  {Math.round((weather.main.temp * 9 / 5) + 32)}
                  <sup>&deg;F</sup>
                </div>
              </div>
              <div
                className="more"
                style={{ transform: display ? "rotate(90deg)" : "rotate(-90deg" }}
              >
                <AiOutlineDoubleLeft onClick={() => handleDisplay()} />
              </div>
              <div className="details">
                    <div  className="detail">
                      <div className="icon"><WiThermometer /></div>
                      <div className="txt">
                        <div className="detail-title">Feel Like</div>
                        <div className="detail-value">{Math.round((weather.main.feels_like * 9 / 5) + 32)}<sup>&deg;F</sup></div>
                      </div>
                    </div>
                    <div  className="detail">
                      <div className="icon"><WiStrongWind /></div>
                      <div className="txt">
                        <div className="detail-title">Wind</div>
                        <div className="detail-value">{`${Math.round(weather.wind.speed)}km/h`}</div>
                      </div>
                    </div>
                    <div  className="detail">
                      <div className="icon"><WiThermometerInternal  /></div>
                      <div className="txt">
                        <div className="detail-title">Humidity</div>
                        <div className="detail-value">{`${weather.main.humidity}%`}</div>
                      </div>
                    </div>
                    <div  className="detail">
                      <div className="icon"><AiFillEye  /></div>
                      <div className="txt">
                        <div className="detail-title">Visibility</div>
                        <div className="detail-value">{`${weather.visibility}km`}</div>
                      </div>
                    </div>
                    <div  className="detail">
                      <div className="icon"><AiOutlineDashboard   /></div>
                      <div className="txt">
                        <div className="detail-title">Pressure</div>
                        <div className="detail-value">{`${weather.main.pressure}hPa`}</div>
                      </div>
                    </div>
                    <div  className="detail">
                      <div className="icon"><AiOutlineCloud    /></div>
                      <div className="txt">
                        <div className="detail-title">Cloud</div>
                        <div className="detail-value">{`${weather.clouds.all}%`}</div>
                      </div>
                    </div>
              </div>
        </div>
        ) : ('')}
    </div>
  );
}

export default Weather;


