import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import './styles/coinInfo.css';
import { CircularProgress } from '@material-ui/core';
// import { Line } from 'react-chartjs-2';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis,CartesianGrid} from 'recharts';

import Charts from "./Charts";

function CoinInfo(props) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  let timeStamps, pricess;
  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(props.coin.id, currency, days));
    setHistoricalData(data.prices);
    console.log("DATA => ",data.prices)
    timeStamps = data.prices.map((val)=>val[0])

  };




  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  if (!historicalData) {
    return <CircularProgress style={{ color: 'gold',justifyContent:"center" }}  size={250} thickness={1} />;
  }

  return (
    <>
      <div className="coinInfo-container">
        <Charts id = {props.coin.id}/>
      </div>
    </>
  );
}

export default CoinInfo;
