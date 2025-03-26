import React from 'react'
import Navbar from '../components/Navbar';
import Banner from '../components/Banner'
import Kitchens from '../components/Kitchens'
import Membership from '../components/Membership'
import Footer from '../components/Footer'
import Aboutus from '../components/Aboutus'
import FAQ from '../components/FaQ';
import AuthProvider from '../conetxt/AuthProvider';
function Home() {
  return (
    <>
    <div className="bg-base-100 dark:bg-base-800 text-text-light dark:text-text-dark min-h-screen">
    <AuthProvider>
    <Navbar/>
    <Banner/>
    <Aboutus/>
    <Membership/>
    <Kitchens/>
    <FAQ/>

    </AuthProvider>
    
    </div>
    </>
  )
}

export default Home
