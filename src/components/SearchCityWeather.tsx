import { Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherCityData } from '.././redux/cityWeaterSlice';
import appIcon from './../images/appIcon.svg'

const SearchCityWeather = () => {

  const [city, setCity] = useState("")

  const [isSending, setIsSending] = useState(false)

  const inputRef = useRef(null)

  const dispatch = useDispatch<any>()

  const error = useSelector<any>(state => state.cardItems.error)

  const search = async () => {
    if (isSending) return
    setIsSending(true)
    await dispatch(getWeatherCityData(city))
    setIsSending(false)
    inputRef.current.value = ''
  }

  return (
    <div >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>City weather</h1>
        <img style={{ paddingLeft: 5, height: 60 }} src={appIcon} alt=''></img>
      </div>
      <div style={{ alignItems: 'center' }}>
        <input style={{ alignItems: 'center', position: 'relative', verticalAlign: 'middle', fontSize: 19, border: 'none', borderRadius: 4, margin: 10 , paddingRight: 50, height: 34 }}
          type='text'
          placeholder='Enter city/town...'
          onChange={(e) => setCity(e.target.value)}
          ref={inputRef} />
        <Button variant='contained' disabled={isSending} onClick={search}>Search</Button>
        {error && <div style={{ fontSize: 'small' }}>city not found</div>}
      </div>
    </div>
  )
}

export default SearchCityWeather