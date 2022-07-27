import React,{useEffect, useState} from 'react'
import './Appointment.css';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CButton, CModal, CModalBody, CModalFooter, CModalTitle , CModalHeader, CCol, CRow, CContainer} from '@coreui/react';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
function Appointment() {
   const selector = useSelector(state=>state.user);
   const _id = selector.user._id;
   const [appointementData, setAppointementData]=useState([]);
   const [patientFirst, setPatientFirst]=useState("");
   const [patientLast, setPatientLast]=useState("");
   const [patientEmail, setPateitEmail]= useState("");
   const [confirm,setConfirm]=useState("");
   const [conDoc, setConDoc]=useState("");
   const [visible, setVisible]=useState(false)
   const [appId, setAppId]=useState("");
    const handleDateClick = (arg) => { // bind with an arrow function
        console.log("ev",arg.date);
      
      }
      const handleEventClick = (e)=>{
    
        console.log("event ", e.event.extendedProps);
        setAppId(e.event.extendedProps._id);
        setPatientFirst(e.event.extendedProps.userId.firstName);
        setPatientLast(e.event.extendedProps.userId.lastName);
        setPateitEmail(e.event.extendedProps.userId.email);
        setConDoc(e.event.extendedProps.confirm)
        setVisible(true);
        // 
       }
      useEffect(()=>{
        axios.get(`http://localhost:5000/appointments/getDoctorAppointemnt/${_id}`)
        .then((res)=>{
          console.log(res.data.data)
          setAppointementData(res.data.data)
        }).catch((err)=>console.log(err))
      },[]);

    const handelConfirm = ()=>{
      axios.put(`http://localhost:5000/appointments/updateappointment/${appId}`, {confirm:'true'})
      .then((res)=>{
       alert(res.data.message);
       setVisible(!visible)
      }).catch((err)=>console.log(err))
      
    }
  
  return (
    <>
        <div className='appointement_container'>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                events={appointementData}
       
         />
    </div>
    <CModal visible={visible} onClose={()=>setVisible(false)} >
      <CModalHeader>
        <CModalTitle>Appointement Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className='patient_ifoContainer'>
          <div className='patient_icon'>
          <PersonOutlineIcon/>
          </div>
          <div className='patient_spContainer'>
          <span>{patientFirst} {patientLast} </span>
          </div>

        </div>
        
         <div className='patient_ifoContainer'>
           <div className='patient_icon'>
             <MailOutlineIcon/>
           </div>
           <div className='patient_spContainer'>
           <span>{patientEmail} </span>
           </div>
         </div>
        
      </CModalBody>
      <CModalFooter>
        {conDoc===true ?
         null
         :
         <>
         <CButton onClick={handelConfirm}> Confirm Appointement</CButton>
        <CButton color='danger'>Decline Appointement</CButton>
         </>
        }
        
      </CModalFooter>
    </CModal>
    </>
  )
}

export default Appointment