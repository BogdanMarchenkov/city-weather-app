import React from 'react';
import './App.css';
import { DetailedWeather } from './components/DetailedWeather';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { SearchCards } from './components/SearchCardsRoute';

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<SearchCards/>} />
            <Route path="/detail" element={<DetailedWeather />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
