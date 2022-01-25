import * as React from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: 'black'
      }
    },
    x: {
      ticks: {
        color: 'black'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  },
  elements: {
    line: {
      borderWidth: 3,
      tension: 0.4
    },
  }
};

export function TradingChart({historical, historicalVolumes, pool}) {
  let data;
  if(historical) {
    data = {
      labels: historical.tradingDates,
      datasets: [
        {
          label: 'TRADES',
          data: historical[pool == 'all' ? 'tradingNumbersAll' : pool == 'pool1' ? 'tradingNumbersPool1' : pool == 'pool2' ? 'tradingNumbersPool2' : pool == 'pool3' ? 'tradingNumbersPool3' : pool == 'race' ? 'tradingNumbersRace' : undefined ],
          fill: true,
          backgroundColor: 'rgba(112, 117, 233, 0.5)',
          borderColor: 'rgba(112, 117, 233, 1)',
        },
      ],
    };
  } 
  if(historicalVolumes) {
    data = {
      labels: historicalVolumes.volumeDates,
      datasets: [
        {
          label: 'VOLUME',
          data: historicalVolumes[pool == 'all' ? 'volumeNumbersAll' : pool == 'pool1' ? 'volumeNumbersPool1' : pool == 'pool2' ? 'volumeNumbersPool2' : pool == 'pool3' ? 'volumeNumbersPool3' : pool == 'race' ? 'volumeNumbersRace' : undefined ],
          fill: true,
          backgroundColor: 'rgba(112, 117, 233, 0.5)',
          borderColor: 'rgba(112, 117, 233, 1)',
        },
      ],
    };
  } 
  return (
    <div style={{marginBottom: '3rem'}}>
      <Line data={data} options={options}
      />
    </div>
  )
};

export default TradingChart;