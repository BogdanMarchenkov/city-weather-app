import React, { useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { removeItems, updateWeatherCityData , getForecast , getDetailedData, setСurrentCity } from '../redux/cityWeaterSlice';
import { useNavigate } from 'react-router-dom'
import tempIcon from './../images/tempIcon.png'

export const BasicCard = (props) => {

  const dispatch = useDispatch<any>()

  const navigate = useNavigate()

  const deleteItem = () => {
    dispatch(removeItems(props))
  }

  const updateWeather = () => {
    dispatch(updateWeatherCityData(props.city))
  }

  useEffect(() => {
    updateWeather()
  })


  const getdetailedForecast = () => {
    navigate('/detail')
    dispatch(getDetailedData(props.city))
    dispatch(getForecast(props.city))
    dispatch(setСurrentCity(props.city))
  }
  
  return (
    <Card sx={{ backgroundColor: '#a0eee9', minWidth: 310 }}>
      <CardContent sx={{ position: 'relative' }}>
        <Typography sx={{ fontSize: 30 }} gutterBottom>
          {props.city}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img style={{ height: 50, paddingRight: 10}} src={tempIcon} alt=''></img>
          <Typography sx={{ mb: 1.5, fontSize: 30 }} color="orange">
            {Math.round(props.temperature)}°C
          </Typography></div>
        <Typography sx={{ fontSize: 20 }} variant="body2">
          {props.weather}
        </Typography>
        <img style={{ position: 'absolute', top: -12 , right: -5 }} src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt=''></img>
      </CardContent>
      <CardActions>
        <Button sx={{ minWidth: 100 }} variant='contained' onClick={getdetailedForecast} size="small">forecast</Button>
        <Button sx={{ minWidth: 100 }} variant='contained' onClick={updateWeather} size="small">refresh</Button>
        <Button sx={{ minWidth: 100 }} variant='contained' onClick={deleteItem} size="small">delete</Button>
      </CardActions>
    </Card>
  );
}