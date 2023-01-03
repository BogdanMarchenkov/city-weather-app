import * as React from 'react';
import { Cards } from './Cards';
import SearchCityWeather from './SearchCityWeather';

export const SearchCards = () => {

  return (
    <div>
      <SearchCityWeather />
      <Cards />
    </div>
  );
}