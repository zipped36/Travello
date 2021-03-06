import './App.css';
import React,{useEffect,useState} from 'react';
import {Grid, CssBaseline} from '@material-ui/core'
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import List from './components/List/List';
import { getPlacesData } from './api'
function App() {
  const [places, setplaces] = useState([]);
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
  const [bounds, setBounds] = useState({});

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} })=>{
      setCoordinates({lat: latitude, lng: longitude});
    })
  },[]);
  useEffect(()=>{
    // console.log(coordinates,bounds);
    getPlacesData(bounds.sw, bounds.ne)
      .then((data)=>{
        console.log(data);
        setplaces(data);
      })
  },[coordinates,bounds]);
  

  return (
    <>
      <CssBaseline>
        <Header/>
        <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={12} md={4}>
            <List places={places}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={places}
            />
          </Grid>
        </Grid>
      </CssBaseline>
    </>
  );
}

export default App;
