import React , {useEffect} from 'react';
import { setError, setСurrentCity} from '../redux/cityWeaterSlice';
import { Cards } from './Cards';
import SearchCityWeather from './SearchCityWeather';
import { useDispatch } from 'react-redux';

export const SearchCards = () => {

  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(setError(false))
    dispatch(setСurrentCity(null))
  })

  return (
    <div>
      <SearchCityWeather/>
      <Cards/>
    </div>
  );
}