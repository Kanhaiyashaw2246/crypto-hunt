import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import {Button} from "@material-ui/core"
import { CryptoState } from '../CryptoContext';
// import '../styles/chart.css';

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

const Charts = (props) => {
  const chartRef = useRef(null);
  
  const { currency } = CryptoState();
  const [days, setDays] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=${currency}&days=${days}`);

        const coinData = response.data;

       
        const timestamps = coinData.prices.map((entry) => {
          let date = new Date(entry[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        });
        const prices = coinData.prices.map((entry) => `${entry[1]}`);

       
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
          type: 'line', 
          data: {
            labels: timestamps,
            datasets: [
              {
                label: 'Coin Price (INR)',
                data: prices,
                // backgroundColor: 'red',
                borderColor: "#EEBC1D",
                borderWidth: .7,
                pointStyle: false,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: false, 
              },
            },
          },
        });
        // <div style={{color:"white",margin:"2rem"}}>
        //   <p>hello</p>
        // </div>
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
console.log("days+>>",days)
  return (
    <div className='chart'>

      <canvas ref={chartRef} width={700} height={300} />
      <div style={{marginTop:"20px",display:"flex",justifyContent:"space-around",width:"100%"}}>
        {chartDays.map((val)=><Button 
        style={{color:"#EEBC1D",border:"1px solid #EEBC1D"}}
        onClick={()=>setDays(val.value)}
        >{val.label}</Button>)}
      </div>
    </div>
  );
};

export default Charts;