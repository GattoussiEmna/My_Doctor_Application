import React from 'react'
import CIcon from '@coreui/icons-react';
import { cilX, cilUser} from '@coreui/icons';
import { Link } from 'react-router-dom'
import "./SideBar.css";

function SideBar({isOpen, toggel}) {

  return (
    <div className='SideBarContainer ' style={{opacity:isOpen?'100% ': '0', top:isOpen? '0 ': '-100%'}}>
      <div className='SideBarContainer_closeIcon'  onClick={toggel}>
        <CIcon icon={cilX} size="xl" />
      </div>
      <div className='SideBar_wapper'>
          <ul className="sideBar_menu">
          <li>
             <Link   to="#" className="sideBar_link"> Home</Link>
           
            </li>
            <li><Link  to="#" className="sideBar_link">About Us</Link></li>
            <li><Link  to="#" className="sideBar_link">Doctors</Link> </li>
            <li><Link  to="#" className="sideBar_link">Reservation</Link> </li>
            <li>
                <button className="sideBar_btn" >   <CIcon icon={cilUser} size="xl" className='navBar_userIcon'/> </button>
              </li>
          </ul>
      </div>
    </div>
  )
}

export default SideBar