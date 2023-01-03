import React, { useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { removeItems, updateWeatherCityData , getForecast , getDetailedData } from '../redux/cityWeaterSlice';
import { useNavigate } from 'react-router-dom'


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
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} gutterBottom>
        {props.city}
        </Typography>
        <Typography sx={{ mb: 1.5 , fontSize: 24}} color="orange">
          {props.temperature}°C
        </Typography>
        <Typography sx={{ fontSize: 20 }}variant="body2">
        {props.weather}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={getdetailedForecast}size="small">details</Button>
        <Button onClick={updateWeather}size="small">refresh now</Button>
        <Button onClick={deleteItem} size="small">delete card</Button>
      </CardActions>
    </Card>
  );
}