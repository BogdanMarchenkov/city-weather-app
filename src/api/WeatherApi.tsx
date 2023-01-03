
const api = {
    key: "4cea4ca1a794857187c4205966b5866a",
    base: "https://api.openweathermap.org/data/2.5/"
}

export const weather = {
    getCityData(search) {
        return fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
    },
    getForecast(city) {
        return fetch(`${api.base}forecast?q=${city}&units=metric&cnt=8&appid=${api.key}`)
            .then((res) => res.json())
    }
}

