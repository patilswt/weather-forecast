import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain,faMapLocation,faTemperatureHigh,faTemperatureLow,faWind } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {

  const searchInput = useRef(null);
  const [res, setRes] = useState(false);
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
          setRes(true);
          setCityName(result1.data.name);
          setMain(result1.data.main);
          setWindSpeed(result1.data.wind.speed);
          setWeather(result1.data.weather[0].main);
          const result2 = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${result1.data.coord.lat}&lon=${result1.data.coord.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=aa6a27980fc75bef322db2bae83f71f0`)
        
          setCloud(result2.data.daily);
          
        }else{
          setRes(false);
          setCloud([]);
        }
        
    } catch (error) {
      console.log(error);
    }

 
  };



  const handleSearch = (event) => {
    event.preventDefault();
    fetchRequest();
    
  };
  return (
    <div className='container inputCol'>
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

      
      <div className={res? "row" : "row hidden"} >
      <div className="current" key='1' style={{backgroundColor:"#000033",color:"#ffffff",fontWeight: "bold"}}>

      <h2>{new Date().toLocaleDateString('en-us', {weekday:'long'}) } {new Date().toLocaleTimeString() }</h2>

      <h2>{new Date().toLocaleDateString('en-us', {day: 'numeric', month: 'long', year: 'numeric'}) }
      </h2>
      </div>  
      <div className="current" key='2' style={{backgroundColor:"#f7f2e0"}}>
      
      <FontAwesomeIcon icon={faCloudSunRain} flip size="6x" style={{color:"#fece00"}}/>
      <h6 style={{color:"#001a66",marginTop:"15px",fontWeight: "bold"}}>{resweather}</h6>
      <h6 style={{color:"#001a66"}}><FontAwesomeIcon icon={faTemperatureHigh} /> {resMain.temp_max}&deg;C  <FontAwesomeIcon icon={faTemperatureLow} /> {resMain.temp_min}&deg;C</h6>

      <h6 style={{color:"#001a66"}}>Humidity {resMain.humidity} <FontAwesomeIcon icon={faWind} /> {reswindspeed}</h6>
      
      </div>
      
      <div className="current" key='3' style={{backgroundColor:"#cddff3",color: "#001a66"}}>
      <FontAwesomeIcon icon={faMapLocation} size="3x" style={{marginTop:"15px"}}/>
        <h2 style={{marginTop:"15px",fontWeight: "bold"}}>{resCity}</h2>
      </div>
      
      </div>
     
      

      {resCloud.map((val) => {
       
        return (
          <>
          <div className="column tempcol" key={val.id} style={{marginTop:"15px"}}>
            <h6 className="componentCenter" style={{fontWeight: "bold"}}>{val.dt}</h6>
            <h6 className="componentCenter">{val.dt}</h6>
            <div className="componentCenter">
              <FontAwesomeIcon icon={faCloudSunRain} size="4x" className="highlight"/>
            </div>
            <h6 className="componentCenter" style={{marginTop:"15px",fontWeight: "bold"}}>{val.temp.max}&deg;C / {val.temp.min}&deg;C</h6>
          
          </div>
          
          </>
        );
      })}   

    </div>

  );
};

export default App;
