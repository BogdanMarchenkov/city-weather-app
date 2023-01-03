import { Button } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BarChart from 'react-bar-chart';

export const DetailedWeather = () => {

  const detailed = useSelector<any>(state => state.cardItems.details)

  const forecast = useSelector<any>(state => state.cardItems.forecast)

  const data = (forecast as unknown as any[]).map((item) => ({ text: item.hours[1].slice(0, -3), value: item.temp }))

  const navigate = useNavigate()

  const backToCards = () => { navigate('/') }

  const margin = { top: 20, right: 0, bottom: 30, left: 0 }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div>
          {detailed !== null && <div style={{ display: "flex", justifyContent: 'space-between', fontSize: 18, padding: 10 }}>
            <div style={{ padding: 10 }}>temperature {detailed["temperature"]}°C</div>
            <div style={{ padding: 10 }}>feels like {detailed['feelsLike']}°C</div>
            <div style={{ padding: 10 }}>wind speed {detailed['wind']} km/h</div>
            <div style={{ padding: 10 }}>humidity {detailed['humidity']}%</div>
          </div>}
          <div >
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
              {(forecast as unknown as any[]).map(item => <div style={{ margin: 25 }} key={item.time}>
                <div>{item.temp}°C</div>
              </div>)}
            </div>
            <BarChart
              width={1000}
              height={300}
              margin={margin}
              data={data}
            /></div>
          <Button onClick={backToCards} size="small">back to cards</Button>
        </div>
      </CardContent>
    </Card>
  )
}