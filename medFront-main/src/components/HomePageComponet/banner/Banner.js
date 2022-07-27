import React from 'react'
import { Link } from 'react-router-dom';
import "./Banner.css";
import doctor from "../../../images/doctor.svg"

function Banner() {
  return (
    <div className='banner' >
       <div className='banner_leftSide'>
          <p className='banner_para'>We Are Here For Your Care</p>
          <h3 className='banner_header'>Best Care & Better Doctor</h3>
          <p className='banner_detailsPara'>
          platform is available for you24/24 and 7 days in week, reservation in any doctor what ever where you are.</p>
          <div className='banner_emptydiv'></div>
          <Link to="/reservation" className='banner_btn' >Get An Appointement</Link>

       </div>
       <div className='banner_rightSide'>
            <img src={doctor} />
       </div>
    </div>
  )
}

export default Banner