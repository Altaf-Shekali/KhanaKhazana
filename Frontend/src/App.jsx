import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Home from './home/Home'
import Kitchen from './Kitchen/Kitchen'
import Membership from './components/Membership';
import Basic from './components/Basic';
import Signup from './components/Signup';
import Login from './components/Login';
import AuthProvider, { useAuth } from './conetxt/AuthProvider';
import  { Toaster } from 'react-hot-toast';
import Profile from './components/PROFILE.JSX';
import Aboutus from './components/Aboutus';
import Kitchen1 from './components/kitchen1';
import AdminPage from './components/AdminPage';
import AddKitchen from './components/Addkitchen';
import FAQ from './components/FaQ';
import KitchenLogin from './components/kitchenlogin';
import KitchenDashboard from './components/kitchendashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
'react-hot-toast';
function App() {
  const [authUser,setAuthUser]=useAuth();
  console.log(authUser);

  return (
    <>
    <div className="bg-base-100 dark:bg-base-800 text-text-light dark:text-text-dark min-h-screen">
      <Navbar/>
        <AuthProvider>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/kitchen"element={<Kitchen/>}/>
        <Route path="/Membership" element={<Membership/>} />
        <Route path="/Basic" element={authUser?<Basic/>:<Navigate to="/Signup"/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/Aboutus" element={<Aboutus/>}/>
        <Route path="/kitchen1" element={<Kitchen1/>}/>
        <Route path="/AdminPage" element={<AdminPage/>}/>
        <Route path="/AddKitchen" element={<AddKitchen/>} /> 
        <Route path="/FaQ"element={<FAQ/>}/>
        <Route path="/kitchenlogin"element={<KitchenLogin/>}/>
        <Route path="/kitchendashboard"element={<KitchenDashboard/>}/>
        </Routes>
        </AuthProvider>
        <Footer/>
      <Toaster/>
       
       
  </div>
    
    
    
    </>
  );
}

export default App;

