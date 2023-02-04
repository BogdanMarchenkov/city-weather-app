import React from "react"
import { Line } from "react-chartjs-2"
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(...registerables , ChartDataLabels)

const LineChart = ({ chartData }) => {

  const minY = Math.min(...chartData.datasets[0].data) - 2
  const maxY = Math.max(...chartData.datasets[0].data) + 2

  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y:
            {
              display: false,
              min: minY,
              max: maxY,
              ticks: {
                display: false,
              }
            },
            x:
            {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            tooltip: {
              enabled: false
            },
            datalabels: {
              display: true,
              color: 'black',
              formatter: function (value) {
                return value.toFixed(1) + '°'
              },
              font: {
                size: 14
              }
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart
