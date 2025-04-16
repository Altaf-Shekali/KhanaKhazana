import React from 'react'
import Banner from '../components/Banner'
import Kitchens from '../components/Kitchens'
import Membership from '../components/Membership'
import Aboutus from '../components/Aboutus'
import FAQ from '../components/FAQ'
import AuthProvider from '../conetxt/AuthProvider';
function Home() {
  return (
    <>
    <div className="bg-base-100 dark:bg-base-800 text-text-light dark:text-text-dark min-h-screen">
    <AuthProvider>
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
