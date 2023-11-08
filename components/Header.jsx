import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import {FaEthereum} from 'react-icons/fa'

const Header = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        <h1>CryptoHub</h1>
        <FaEthereum color='orange' size={'25px'}/>
      </div>
      <ul>
        <li> <Link to='/'>  Home </Link> </li>
        <li> <Link to= '/coins'> Coins</Link> </li>
        <li> <Link to= '/about'> About</Link> </li>
        
      </ul>
    </div>
  )
}

export default Header
