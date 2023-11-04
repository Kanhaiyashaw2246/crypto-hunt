import React, { useEffect, useState } from 'react'
import "./styles/carousel.css"
import axios from "axios"
import {CryptoState} from ".././CryptoContext"
import {TrendingCoins} from '.././config/api'
import AliceCarousel from 'react-alice-carousel';
import {Link} from "react-router-dom"

function Carousel() {
    const [trending, setTrending] = useState([])
    const {currency, symbol} = CryptoState()
    const fetchTrendingCoins = async () =>{
        const {data} = await axios.get(TrendingCoins(currency));
        console.log(data)
        setTrending(data);
    }
    console.log(trending,currency)

    useEffect(()=>{
      try{
        fetchTrendingCoins()
      }catch(err){
        console.log("ERROR==> ",err)
      }
    },[currency])


    const items = trending.map((val)=>{

      let profit = val.price_change_percentage_24h >= 0;
      let color = profit === true ? "rgb(14,203,129)" : "red"; 
      // console.log(color)
      return(
        <Link to={`/coins/${val.id}`}>
          <img src={val?.image} alt={val.name} height={80}/>
          <span style={{marginLeft:"10px",color:"white",textTransform:"uppercase"}}>{val.symbol} </span>
          {/* <span style={{color:color}} >{profit && "+"} {val.price_change_percentage_24h.toFixed(2)}%</span> */}
          <div style={{color:color}}>{symbol}{addCommasToNumber(val.current_price)} ({profit && "+"} {val.price_change_percentage_24h.toFixed(2)}%)</div>
        </Link>
        
      )
    });

    function addCommasToNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    console.log(items)

  return (
    <>
    <div className="carousel">
      <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={{0:{items:3},512:{items:5}}}
        autoPlay
        items={items}
        
      />

    </div> 
    </>
  )
}

export default Carousel
