import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { BaseUrl } from './BaseUrl'
import { useParams } from 'react-router-dom'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({currency}) => {
    const {id} =useParams()
    const[chartData,setChartData] = useState([])
    const[days,setDays] = useState(1)
    const CoinChartData = async() =>{
        const {data} = await axios.get(`${BaseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        // console.log(data.prices)
        setChartData(data.prices)
    }
    useEffect(()=>{
        CoinChartData();
    },[currency,id,days])
    const myData ={
      labels: chartData.map((value)=>{
        const date = new Date(value[0])
       const time = date.getHours()>12
    ? `${date.getHours() - 12}:${date.getMinutes()}PM`
    :`${date.getHours()} : ${date.getMinutes()}AM  ` 
    return days===1 ? time:date.toLocaleDateString()
 }),
    datasets:[
        {
            label: `Price in Past Days ${days} in ${currency}`,
            data: chartData.map((value)=>value[1]),
            borderColor:'orange',
            borderWidth: '3'
        }
    ]
    }
  return (
    <div>
      <Line data ={myData} options={{
        elements:{
            point:{
                radius:1
            }
        }
      }} style={{marginTop:'5rem',width:'60rem'}}/>
         <div className="btn" style = {{marginTop:'30px'}}>
      <button onClick={()=>setDays(1)}>24 Hours</button>
      <button onClick={()=>setDays(31)}>1 Month</button>
      <button onClick={()=>setDays(365)}>1 Year</button>
    </div>
    </div>
  )
}

export default CoinChart
