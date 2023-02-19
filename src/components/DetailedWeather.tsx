import { Button } from '@mui/material'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LineChart from './Chart'
import temp from './../images/temp.svg'
import feels from './../images/feels.svg'
import wind from './../images/wind.svg'
import humidity from './../images/humidity.svg'

const Vidget = ({ icon, rate, mark, name }) => {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <img style={{ width: 40 }} src={icon} alt=''></img>
        <span style={{ fontSize: 24 }}>{Math.round(rate)}</span>
        <span style={{ fontSize: 14 }}>{mark}</span>
      </div>
      <div style={{ fontSize: 14 }}>{name}</div>
    </div>
  )
}

export const DetailedWeather = () => {

  const detailed = useSelector<any>(state => state.cardItems.details)

  const forecast = useSelector<any>(state => state.cardItems.forecast)

  const currentCity = useSelector<any>(state => state.cardItems.currentCity)

  const navigate = useNavigate()

  const backToCards = () => { navigate('/') }

  let width, height, gradient;
  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
      gradient.addColorStop(0, 'rgb(5, 203, 167, 0)');
      gradient.addColorStop(0.5, 'rgb(224, 196, 15, 0.7)');
      gradient.addColorStop(1, 'rgb(228, 101, 3, 0.9)');
    }
    return gradient;
  }

  const gradientFunc = function (context) {
    const chart = context.chart;
    const { ctx, chartArea } = chart;
    if (!chartArea) {
      return;
    }
    return getGradient(ctx, chartArea)
  }

  const d = new Date()
  const localTime = d.getTime()
  const localOffset = d.getTimezoneOffset() * 60000
  const utc = localTime + localOffset
  const cityTimeMillisec = utc + (1000 * detailed["timezone"])
  const nd = new Date(cityTimeMillisec)
  const cityTime = nd.toString().split(' ')[4].split(':')
  const cityTimeArray = (cityTime as unknown as number[])
  const citySecNumber = cityTimeArray[0] * 3600 + cityTimeArray[1] * 60 + cityTimeArray[2] * 1
  const cityTime3hoursGap = citySecNumber / 3600 / 3
  const restGapShare = cityTime3hoursGap - Math.floor(cityTime3hoursGap)
  const gapNumber = restGapShare >= 2 / 3 ? Math.ceil(cityTime3hoursGap) : Math.floor(cityTime3hoursGap)
  const startHourForecast = gapNumber < 0 ? (8 + gapNumber) * 3 : gapNumber * 3

  let timeSlots = []

  for (let i = 0; i <= 7; i++) { timeSlots.push(startHourForecast + i * 3) }

  const chartData = {
    labels: timeSlots.map((item) => item >= 24 ? item - 24 + ':00' : item + ':00'),
    datasets: [
      {
        data: (forecast as unknown as any[]).map((item) => item.temp),
        borderColor: gradientFunc,
        backgroundColor: gradientFunc,
        borderWidth: 2,
        radius: 20,
        hoverRadius: 22,
        fill: 'stack',
      }
    ]
  }

  return (
    <Card sx={{ backgroundColor: '#DCDCDC', minWidth: 310, borderRadius: 2 }}>
      <CardContent>
        <div>
          {currentCity !== null && <div style={{ color: '#19181A' }}>{currentCity as unknown as string}</div>}
          {detailed !== null && <div style={{ display: "flex", justifyContent: 'space-between', color: '#19181A' }}>
            <Vidget icon={temp} rate={detailed["temperature"]} mark='°C' name='temperature' />
            <Vidget icon={feels} rate={detailed["feelsLike"]} mark='°C' name='feels like' />
            <Vidget icon={wind} rate={detailed["wind"]} mark='km/h' name='wind speed' />
            <Vidget icon={humidity} rate={detailed["humidity"]} mark='%' name='humidity' />
          </div>}
          <div >
            {chartData && <LineChart chartData={chartData} />}
          </div>
          <Button onClick={backToCards} size="small">back to cards</Button>
        </div>
      </CardContent>
    </Card>
  )
}
