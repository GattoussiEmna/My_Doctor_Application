import React from 'react'
import HomePage from 'src/HomePage'
import { useLocation } from 'react-router-dom';
import undraw_doctors_hwty from "../../../images/undraw_doctors_hwty.svg";
import emergency from '../../../images/emergency.svg';
import step1 from '../../../images/step1.svg';
import step2 from '../../../images/step2.svg';
import step3 from '../../../images/step3.png';
import tof1 from '../../../images/tof1.png';
import tof2 from '../../../images/tof2.png';
import science from '../../../images/science.svg';
import "./About.css";
import Footer from '../Footer/Footer';
function About() {
  
  return (
      <>
    <HomePage/>
       <div className='about'>
            <div className='about_leftSide'>
                 <img src={undraw_doctors_hwty} />
            </div>
            <div className='about_rightSide'>
               <h3 className='about_header'>About Us</h3>
               <p className='about-_par'>
               This application is created to help people how cant went to the doctor, start reservation on line by choosing the doctor you want. Beside that you can add an appointment to our Database and our back office well respond you soon.
                </p>
               <div className='about_avd'>
                  <li> 
                    <img src={step1} />   
                    <h5>Get to your doctor quickly </h5>  
                  </li>
                  <li id="about_center">  
                        <img src={step2} />   
                        <h5>Make an appointment online at any time</h5> 
                  </li>
                  <li>  
                       <img src={science} />   
                       <h5>Get to your laboratory easy</h5> 
                  </li>
               </div>
            </div>
        </div>
        <Footer/>
      </>

  )
}

export default About