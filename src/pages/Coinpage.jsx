import React, { useEffect, useState } from 'react'
import "../pages/coinpage.css";
import { useParams } from 'react-router-dom';
import { CryptoState } from ".././CryptoContext";
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { LinearProgress } from '@material-ui/core';
import { addCommasToNumber } from '../components/CoinsTable';
// import ReactHtmlP from 'react-html-parser'
// import 



function Coinpage() {

const {id} = useParams();
const [coin, setCoin] = useState();
const {currency, symbol} = CryptoState();
let currencyName = currency.toLowerCase();



const fetchCoin  = async () =>  {
  const {data } = await axios.get(SingleCoin(id));
  setCoin(data);
}
console.log(coin)
useEffect(()=>{
  fetchCoin();
},[])


// if(!coin) return <LinearProgress style={{backgroundColor:"gold"}} />
if(!coin){
  return <LinearProgress style={{backgroundColor: "gold"}} />
}

  return (
    <>
     <div className="container">
      <div className="side-bar">
        
        <img
        src={coin?.image.large}
        alt={coin?.name}
        height={200}
        style={{marginBottom:20}}
        />
        <h3>{coin?.name}</h3>
        <p>{ coin?.description.en.split(". ")[0]}.</p>
        <div className="additional-info">
          <span>
            <h2>Rank :&nbsp; {coin?.market_cap_rank}</h2>
          </span>
          <span>
            <h2>Current Price :&nbsp;{symbol} {coin?.market_data.current_price[currency.toLowerCase()]}</h2>
          </span>
          <span>
            <h2>Market Cap :&nbsp; {coin?.market_cap}</h2>
          </span>
        </div>
      </div>
      <div className="chart">
        
        <CoinInfo coin={coin}/>
      </div>
     </div>
    </>
  )
}

export default Coinpage
