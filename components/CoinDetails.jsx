import React from 'react'
import { useState,useEffect } from 'react'
import Loading from './Loaders'
import axios from 'axios'
import { BaseUrl } from './BaseUrl'
import { useParams } from 'react-router-dom'
import coinImage from '../coin.png'
import './coindetail.css'
import {BiSolidUpArrow,BiSolidDownArrow} from 'react-icons/bi'
import {IoPulseOutline} from 'react-icons/io5'
import CoinChart from './CoinChart'
import Header from './Header'

const CoinDetails = () => {
  const[loader,setLoader] = useState(true)
  const[coin,setCoin] = useState([])
  
  const{id} =useParams()
  const[currency,setCurrency] = useState('inr')
  const profit = coin.market_data?.price_change_percentage_24h>0
  let currencySymbol = currency === 'inr'? '₹':'$'
  useEffect(()=>{
    const getCoin = async() =>{
      const{data} = await axios.get(`${BaseUrl}/coins/${id}`)
      console.log(data)
      setCoin(data)
      setLoader(false)
    }
    getCoin()
  },[])
  return (
    <>
   {
    loader? <Loading/>:<>
   
    <div className="coin-detail">
      <div className="coin-info">
      <div className="btn">
      <button onClick={()=>setCurrency('inr')}>INR</button>
      <button onClick={()=>setCurrency('usd')}>USD</button>
    </div>
        <div className="coin-update">
         {coin.last_updated}
        </div>
        <div className="coin-img">
          <img height={'150px'} src={coin.image.large} alt="" />
        </div>
        <div className="coin-name">
         {coin.name}
        </div>
        <div className="coin-price">
          {currencySymbol}{coin.market_data.current_price[currency]}
        </div>
        <div className="coin-profit">
         {profit ? <BiSolidUpArrow color='green'/> : <BiSolidDownArrow color='red'/>}
         {coin.market_data.price_change_percentage_24h}%
        
        </div>
        <div className="coin-rank">
          {<IoPulseOutline color='orange'/>}
         # {coin.market_cap_rank}
        </div>
        <div className="coin-desc">
         <p>{coin.description['en'].split('.')[0]}</p>
        </div>
      </div>
      <CoinChart currency = {currency}/>
    </div>
    </>
   }
   </>
  )
  
}

export default CoinDetails
