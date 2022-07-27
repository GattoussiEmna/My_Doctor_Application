import React, { Component, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import About from './components/HomePageComponet/AboutUs/About'
import Reservation from './components/HomePageComponet/Reservation/Reservation'
import HomePage from './HomePage'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))


// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const MedicalInformation =  React.lazy(() => import('./views/pages/register/MedicalInformation'))

function App (){
  const dispatch =useDispatch();
  //const [user, setUser]=useState(null);
  const isLogin = useSelector(state=> state.isLogIn)
  const user = useSelector(state=> state.user)
  console.log("app", user)
  /* useEffect(()=>{
    dispatch({
      type: 'onLogin',
      isLogIn :false
   })
   dispatch({
     type:'setUser',
     user:[]
   })
   },[])*/

  



    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            
                   
                 
                     <Route exact path="*"  element={isLogin ?  <DefaultLayout /> :<HomePage/>}/> 
          
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/medicalInformation" name="Medical Information" element={<MedicalInformation />} />
            
                   
              
             
           <Route  path="/aboutUs" name="About Us" element={<About />}  />
           <Route  path="/reservation" name="Reservation" element={<Reservation />}  />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  
}

export default App
