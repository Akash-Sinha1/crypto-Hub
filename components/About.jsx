import React from 'react'
import Header from './Header'

const About = () => {
  return (
    <div>
    <Header /> {/* Include the Header component */}
   <div style={{display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70vh'}}>
   <h1 >About Us</h1>
    <p> coming soon!</p>
   </div>
  </div>

  )
}

export default About
