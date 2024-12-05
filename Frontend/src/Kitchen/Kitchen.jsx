import React from 'react'
import Navbar from '../components/navbar'
import Kitchenss from '../components/Kitchenss'

import Footer from '../components/Footer'


function Kitchen() {
  return (
    <>
    <Navbar/>
     <div className="min-h-screen">
     <Kitchenss/>
     </div>
    <Footer/>
    
    </>
  )
}

export default Kitchen;
