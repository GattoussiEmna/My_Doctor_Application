import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Avatar from '@mui/material/Avatar';

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state=>state.user);
const role = selector.user.role;
  const userId= selector.user._id;
  const [img,setImg]=useState('');
  useEffect(()=>{
    axios.get(`http://localhost:5000/users/getPic/${userId}`)
    .then((res)=>{
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      setImg(link);
     
    })
    .catch((err)=>console.log(err))
  },[])
  // Log Our function
  const  logOut = ()=>{
    dispatch({
      type: 'setUser',
      user : []
    })
    dispatch({
      type: 'onLogin',
      isLogIn : false
    })
  }
   
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
      <Avatar src={`http://localhost:5000/users/getPic/${userId}`} >
 
          { selector.user.firstName[0]}
      </Avatar>
        
      </CDropdownToggle>
    
                       <CDropdownMenu className="pt-0" placement="bottom-end">
                        <CDropdownItem href="#" onClick={logOut} >
                        <CIcon icon={cilLockLocked} className="me-2"  />
                          LogOut
                        </CDropdownItem> 
                        </CDropdownMenu>
   
     
  
      
     
    </CDropdown>
  )
}

export default AppHeaderDropdown
