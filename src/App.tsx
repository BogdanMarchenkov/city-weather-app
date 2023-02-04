import React from 'react';
import './App.css';
import { DetailedWeather } from './components/DetailedWeather';
import { Routes,Route, HashRouter } from 'react-router-dom';
import { SearchCards } from './components/SearchCardsRoute';

const App = () => {

  return (
   <HashRouter>
    {/* <BrowserRouter> */}
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<SearchCards/>} />
            <Route path="/detail" element={<DetailedWeather />} />
          </Routes>
        </header>
      </div>
    {/* </BrowserRouter> */}
    </HashRouter>
  );
}

export default App;
