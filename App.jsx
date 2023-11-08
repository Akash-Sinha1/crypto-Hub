
import './App.css'
import {Routes,Route} from "react-router-dom"
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';
import About from './components/About';


function App() {


  return (
  <Routes>
    <Route path='/' element = {<Exchanges/>}/>
   <Route path='/coins' element = {<Coins/>}/>
   <Route path='/coins/:id' element ={<CoinDetails/>}/>
   <Route path='/about' element ={<About/>} /> 
 
   </Routes>       
);
}

export default App
