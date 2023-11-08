import React from 'react'
import { useState,useEffect } from 'react'
import { BaseUrl } from './BaseUrl'
import Loading from './Loaders'
import axios from 'axios'
import Header from './Header'
import { Link } from 'react-router-dom'
import './coin.css'

const Coins = () => {
  const[loader,setLoader] = useState(true)
  const [coins,setCoins] = useState([])
  const[search,setSearch] = useState('')
  ;const[currency,setCurrency] = useState('inr');
  let currencySymbol = currency === 'inr'? '₹':'$'
 
  useEffect(()=>{
    const getCoinsData = async() =>{
    const {data} = await axios.get(`${BaseUrl}/coins/markets?vs_currency=${currency}`)
    console.log(data)
    setCoins(data)
    setLoader(false)
    
    }
    getCoinsData();
  },[currency])
  return (
   <>
   
   {
    
    loader? <Loading/> :<>
    <Header/>
    
    <div className="search-bar">
      <input type='text' placeholder='search your coins'
      
       onChange={(e)=>{setSearch(e.target.value)}}
       />
    </div>
    <div className="btns">
      <button onClick={()=>setCurrency('inr')}>INR</button>
      <button onClick={()=>setCurrency('usd')}>USD</button>
    </div>
   { coins.filter((data)=>{
    if(data == ''){
       return data
    }else if(data.name.toLowerCase().includes(search.toLowerCase())){
     return data
    }
   }).map((coindata,i) =>{
       return(
        <Coincard coindata = {coindata} i ={i} id={coindata.id} currencySymbol = {currencySymbol}/>
      )
    })
  }
    </>
   }
   </>
  )
}
const Coincard = ({coindata,i,currencySymbol,id}) =>{
  const profit = coindata.price_change_percentage_24h>0;
  return(
   <Link to={`/coins/${id}`} style={{color:'white',textDecoration:'none'}}>
    <div key = {i} className="cards">
        <div className="image">
         
 <img height ={'80px'} src={coindata.image} alt="" />
        </div>
        <div className="name">
       {coindata.name}
        </div>
        <div className="price">
            {currencySymbol} {coindata.current_price.toFixed(0)}
        </div>
        <div className="rank" style={profit?{color:'green'}:{color:'red'}}>
             {profit? '+'+coindata.price_change_percentage_24h.toFixed(2)
             :coindata.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
   </Link>
  )
}

export default Coins
