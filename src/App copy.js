import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain,faMapLocation,faTemperatureHigh,faTemperatureLow,faWind } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {

  const searchInput = useRef(null);
  const [resCity, setCityName] = useState(null);
  const [resweather, setWeather] = useState(null);
  const [reswindspeed, setWindSpeed] = useState(null);
  const [resCloud, setCloud] = useState([]);
  const [resMain, setMain] = useState([]);
  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = async () => {

    try {
        if(searchInput.current.value !== ''){
          const result1 = await axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${searchInput.current.value}&units=metric&appid=aa6a27980fc75bef322db2bae83f71f0`)
          .then(response => {
          return response
          });
console.log(result1);
          setCityName(result1.data.name);
          setMain(result1.data.main);
          setWindSpeed(result1.data.wind.speed);
          setWeather(result1.data.weather[0].description);
          const result2 = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${result1.data.coord.lat}&lon=${result1.data.coord.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=aa6a27980fc75bef322db2bae83f71f0`)
          // console.log(result2.data.daily);
          setCloud(result2.data.daily);
          
        }
        
    } catch (error) {
      console.log(error);
    }

 
  };



  const handleSearch = (event) => {
    event.preventDefault();
    // console.log(searchInput.current.value);
    if(searchInput.current.value !== ''){
    fetchRequest();
    }
  };
  return (
    <div className='container'>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='City Name ...'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>


      <div className="row" >
      <div className="current" key='1'>
      {new Date().toLocaleDateString('en-us', {weekday:'long'}) }
      {new Date().toLocaleDateString('en-us', {day: 'numeric', month: 'long', year: 'numeric'}) }
      </div>  
      <div className="current" key='2'>
      
      <FontAwesomeIcon icon={faCloudSunRain} flip size="6x"/>
      <h6 style={{color:"#001a66",marginTop:"15px"}}>{resweather.toUpperCase()}</h6>
      <h6 style={{color:"#001a66"}}><FontAwesomeIcon icon={faTemperatureHigh} /> {resMain.temp_max}&deg;C <FontAwesomeIcon icon={faTemperatureLow} /> {resMain.temp_min}&deg;C</h6>

      <h6 style={{color:"#001a66"}}>Humidity {resMain.humidity} <FontAwesomeIcon icon={faWind} /> {reswindspeed}</h6>
      
      </div>
      <div className="current" key='3' style={{backgroundColor:"#ffff80",color: "#001a66"}}>
      <FontAwesomeIcon icon={faMapLocation} size="3x" style={{marginTop:"15px"}}/>
        <h2 style={{marginTop:"15px"}}>{resCity}</h2>
      </div>
      </div>



      

      {resCloud.map((val) => {
       
        return (
          <>
          <div className="column tempcol" key={val.id}>
            <h6 className="componentCenter">{val.dt}</h6>
            <h6 className="componentCenter">{val.dt}</h6>
            <div className="componentCenter">
              <FontAwesomeIcon icon={faCloudSunRain} size="4x" className="highlight"/>
            </div>
            <h6 className="componentCenter" style={{marginTop:"15px"}}>{val.temp.max}&deg;C / {val.temp.min}&deg;C</h6>
          
          </div>
          
          </>
        );
      })}
     



    </div>


  );
};

export default App;
