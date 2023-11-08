import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from "axios"
import { BaseUrl } from './BaseUrl'
import Loading from './Loaders'
import coin from '../coin.png'
import './Exchanges.css'
import OurModel from './OurModel'
import { Link } from 'react-router-dom'


const Exchanges = () => {
  const[loader,setLoader] = useState(true)
  const [exchanges,setExchanges] = useState([])
  const[searcher,setSearcher] = useState('')
 
  useEffect(()=>{
    const getExchangeData = async() =>{
    const {data} = await axios.get(`${BaseUrl}/exchanges`)
    console.log(data)
    setExchanges(data)
    setLoader(false)
    
    }
    getExchangeData();
  },[])
  return (
   <>
  {
    loader ? <Loading/>: 
    <>
      <Header/>
    <OurModel/>
    <div className="search">
      <input type='text' placeholder='search your exchange'
      
       onChange={(e)=>{setSearcher(e.target.value)}}
       />
    </div>
      <div>
       {
        exchanges.filter((data)=>{
          if(data == ''){
            return data
         }else if(data.name.toLowerCase().includes(searcher.toLowerCase())){
          return data
         }
        }).map((item,i)=>{
          return(
         
            <div key = {i} className="cards">
            <div className="image">
             
     <img height ={'80px'} src={item.image} alt="" />
            </div>
            <div className="name">
           {item.name}
            </div>
            <div className="price">
                 {item.trade_volume_24h_btc.toFixed(0)}
            </div>
            <div className="rank">
                 {item.trust_score_rank}
            </div>
          </div>
          
          )
        })
          
        
       }
      </div>
    </>
   }
 
    
   </>
  )
}

export default Exchanges
