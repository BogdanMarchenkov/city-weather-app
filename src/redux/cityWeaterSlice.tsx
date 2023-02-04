import { weather } from "../api/WeatherApi"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const getWeatherCityData = createAsyncThunk(
    'getWeatherCityData',
    async (search: string, thunkAPI) => {
        let response = await weather.getCityData(search)
        if (response.cod === 200) {
            thunkAPI.dispatch(addItems(response))
            thunkAPI.dispatch(setError(false))
        }
        else thunkAPI.dispatch(setError(true))
    }
)

export const getDetailedData = createAsyncThunk(
    'getDetailedData',
    async (search: string, thunkAPI) => {
        let response = await weather.getCityData(search)
        if (response.cod === 200) {
            thunkAPI.dispatch(setDetails(response))
        }
    }
)
export const updateWeatherCityData = createAsyncThunk(
    'updateWeatherCityData',
    async (search: string, thunkAPI) => {
        let response = await weather.getCityData(search)
        if (response.cod === 200) {
            thunkAPI.dispatch(updateItems(response))
        }
    }
)

export const getForecast = createAsyncThunk(
    'getForecast',
    async (city: string, thunkAPI) => {
        let response = await weather.getForecast(city)
        const weatherForecast = response.list.map((item) => ({
            temp: item.main.temp
        }))
        thunkAPI.dispatch(setForecast(weatherForecast))
    })

// const items = localStorage.getItem('cardItems') !== null ? JSON.parse(localStorage.getItem('cardItems')) : []

const cityWeatherSlice = createSlice({
    name: 'cards',
    initialState: {
        // cardItems: items,
        cardItems: [],
        currentCity: null,
        details: null,
        forecast: [],
        error: false
    },
    reducers: {
        addItems(state, action) {
            const newItem = action.payload
            const existingItem = state.cardItems.find(
                (item: { id: any; }) => item.id === newItem.id
            )
            if (!existingItem) {
                state.cardItems.push(
                    {
                        id: newItem.id,
                        city: newItem.name,
                        temperature: newItem.main.temp,
                        weather: newItem.weather[0].description,
                        icon: newItem.weather[0].icon
                    }
                )
            }
            // localStorage.setItem('cardItems', JSON.stringify(state.cardItems.map((item: any) => item)))
        },
        updateItems(state, action) {
            const newItem = action.payload
            const itemToUpdate = state.cardItems.find((todo: { id: any; }) => todo.id === newItem.id)
            itemToUpdate.temperature = newItem.main.temp
            itemToUpdate.weather = newItem.weather[0].description
            itemToUpdate.icon = newItem.weather[0].icon
            // localStorage.setItem('cardItems', JSON.stringify(state.cardItems.map((item: any) => item)))
        },
        removeItems(state, action) {
            state.cardItems = state.cardItems.filter((todo: { id: any; }) => todo.id !== action.payload.id);
            // localStorage.setItem('cardItems', JSON.stringify(state.cardItems.map((item: any) => item)))
        },
        setForecast(state, action) {
            state.forecast = action.payload;
        },
        setDetails(state, action) {
            const newItem = action.payload
            state.details = {
                timezone: newItem.timezone,
                temperature: newItem.main.temp,
                feelsLike: newItem.main.feels_like,
                wind: newItem.wind.speed,
                humidity: newItem.main.humidity
            }
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setСurrentCity(state, action) {
            state.currentCity = action.payload;
        }
    }
});

export const { addItems, setForecast, removeItems, updateItems, setDetails, setError, setСurrentCity } = cityWeatherSlice.actions;

export default cityWeatherSlice.reducer;


