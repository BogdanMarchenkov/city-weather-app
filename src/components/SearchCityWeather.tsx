import { Button} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getWeatherCityData } from '.././redux/cityWeaterSlice';

const SearchCityWeather = () => {

  const [city, setCity] = useState("")

  const [isSending, setIsSending] = useState(false)

  const [isError, setError] = useState(false)

  const inputRef = useRef(null)

  const dispatch = useDispatch<any>()

  const search = async () => {
    if (isSending) return
    setIsSending(true)
    let resultCode = await dispatch(getWeatherCityData(city))
    if (resultCode.payload === '404') { setError(true) } else { setError(false) }
    setIsSending(false)
    inputRef.current.value = ''
  }

  return (
    <div>
      <h1>City weather</h1>
      <div style={{ alignItems: 'center' }}>
        <input style={{ alignItems: 'center', position: 'relative' , verticalAlign: 'middle' , fontSize: 19 , border: 'none', borderRadius: 4 , margin: 10 , height : 34 }}
          type='text'
          placeholder='Enter city/town...'
          onChange={(e) => setCity(e.target.value)}
          ref={inputRef} />
        <Button variant='contained' disabled={isSending} onClick={search}>Search</Button>
        {isError ? <div style={{ fontSize: 'small' }}>city not found</div> : <div></div>}
      </div>
    </div>
  )
}

export default SearchCityWeather