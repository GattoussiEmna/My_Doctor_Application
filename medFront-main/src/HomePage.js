import React,{useEffect, useState} from 'react'
import NavBar from './components/HomePageComponet/NavBar/NavBar'
import SideBar from './components/HomePageComponet/SideBar/SideBar';
import Banner from './components/HomePageComponet/banner/Banner';
import About  from './components/HomePageComponet/AboutUs/About';
import { Router, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from './components/HomePageComponet/Footer/Footer';

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 
  const [pathName, setPathName]= useState("");
 
  
  useEffect(()=>{
   setPathName(location.pathname) ;
    console.log(pathName)
  },[pathName])

  const toggel = () => {
      setIsOpen(!isOpen);
      console.log("clicked")
  }
  return (
    <div className='homePage'>  
      <SideBar  isOpen={isOpen} toggel={toggel}/>
      <NavBar toggel={toggel}  />
   
      
        

     
         {
                (() => {
                    if(pathName !="/aboutUs" &&  pathName !="/reservation") {
                            return (
                              <>
                               <Banner/>
                               <Footer/>
                              </>
                              
                            )
                        } 
                  
                   
                   
                })()  
            }  
     
    

    </div>
  )
}

export default HomePage