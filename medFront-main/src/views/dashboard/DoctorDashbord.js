import React from 'react'
import { useSelector } from 'react-redux'
import wave from "../../images/wave.png"

function DoctorDashbord() {
    const select = useSelector(state=>state.user);
    const name = select.user.firstName;
    
  return (
    <div className='pateintDashbord'>
        <div className='patientDashbord_welContainer'>
        <div>  <img src={wave} style={{width:'80px'}} /></div>
        <div>  <h3> Welecom Dr {name}!</h3></div>
    
        </div>
    </div>
  )
}

export default DoctorDashbord