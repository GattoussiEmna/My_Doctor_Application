import React from 'react'
import './PatientDashbord.css'
import wave from "../../images/wave.png"
import { useSelector } from 'react-redux'
function PatinetDashbord() {
  const select = useSelector(state=>state.user)
  const userName= select.user.firstName
  return (
    <div className='pateintDashbord'>
       <div className='patientDashbord_welContainer'>
         <div>  <img src={wave} style={{width:'80px'}} /></div>
         <div>  <h3> Welecom {userName}!</h3></div>
    
       </div>
           
            
      
              
           
    </div>
  )
}

export default PatinetDashbord