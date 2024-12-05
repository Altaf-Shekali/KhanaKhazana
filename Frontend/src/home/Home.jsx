import React from 'react'
import Navbar from '../components/Navbar';
import Banner from '../components/Banner'
import Kitchens from '../components/Kitchens'
import Membership from '../components/Membership'
import Footer from '../components/Footer'
import Aboutus from '../components/Aboutus'
function Home() {
  return (
    <>
    <div className="bg-base-100 dark:bg-base-800 text-text-light dark:text-text-dark min-h-screen">

    <Navbar/>
    <Banner/>
    <Kitchens/>
    <Membership/>
    <Aboutus/>
    <Footer/>

    </div>
    </>
  )
}

export default Home
