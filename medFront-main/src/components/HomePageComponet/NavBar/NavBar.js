import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import logo from "../../../images/logo.png";
import CIcon from '@coreui/icons-react';
import { cilUser, cilMenu } from '@coreui/icons';
import "./NavBar.css";
import {animateScroll as scroll} from 'react-scroll'
import Popover from '@mui/material/Popover';
import Modal from '@mui/material/Modal';
import { CDropdown, CDropdownItem,CDropdownToggle,CDropdownMenu, CButton, CTooltip } from '@coreui/react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function NavBar({toggel}) {
    const [scrollNav, setScrollNav] =useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openM, setOpenM] = React.useState(false);
    const handleOpen = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    const changeNav = () =>{
        if(window.scrollY >= 80){
            setScrollNav(true);
            console.log('helllo')
        }else{
            setScrollNav(false)
        }
    }
    const toggelHome = () =>{
         scroll.scrollToTop()
    }
    useEffect(()=>{
        console.log('use effect')
        window.addEventListener('scroll',changeNav );

         // this will clean up the event every time the component is re-rendered
       return function cleanup() {
        window.removeEventListener('scroll', changeNav)
      }
    }, []);

  return (
    <>
      <div className='home_navBar'>
      <div>
        <Link to="/">
           <img src={logo}  />
        </Link>   
     
      </div>
      <div className='home_navBarMobileIcon'  onClick={toggel}>
      <CIcon icon={cilMenu} size="xl"/>
      </div>
     <div >
        <ul className='home_navBar_link'>
            <li>
             <Link   to="/"> Home</Link>
           
            </li>
            <li><Link   to="/aboutUs">About Us</Link></li>
           
            <li><Link  to="/reservation">Reservation</Link> </li>
            <li>
                <CButton className='navBar_btn' href="/#/login" role="button" > 
                  <CTooltip content="Login"   placement="bottom"> 
                      
                        <CIcon icon={cilUser} size="xl" className='navBar_userIcon'/> 
 
                  </CTooltip>
                  
                </CButton>
              </li>
        </ul>
      
     </div>
    
    </div>
  
    </>
  
  )
}

export default NavBar