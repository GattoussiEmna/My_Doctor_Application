import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormLabel,  CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
  } from '@coreui/react';
  
  import CIcon from '@coreui/icons-react'
  import { cilCalendar, cilHome, cilLockLocked, cilUser } from '@coreui/icons'
  
  import axios from 'axios';
  import { useLocation } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

function MedicalInformation() {
    const [weight,setWeight]=useState('');
    const [height,setheight]=useState('');
    const [bloodType,setbloodType]=useState('');
    const [allergies,setallergies]=useState('');
    const [diseases,setdiseases]=useState('');
    const [validated, setValidated] = useState(false)
    let navigate  = useNavigate  ();
    const location = useLocation();

    const handelMedicalInformation =(event)=>{
      event.preventDefault();

      console.log("location",location.state.id)
      const user = location.state.id;
      axios.post("http://localhost:5000/dossierMedicals/AdddossierMedical",{weight,height,bloodType,allergies,diseases,user})
      .then((res)=>{
          console.log(res.data)
          navigate("/");
      }).catch((err)=>console.log(err))
    }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm 
               noValidate
               validated={validated}
               onSubmit={handelMedicalInformation}
               >
                <h1>Medical Information</h1>
                <p className="text-medium-emphasis">Create your Medical Folder</p>
                <div style={{display:'flex', flexDirection:"column", paddingBottom:'10px'}} >
                        <CRow>
                        
                            <label>Height</label>
                    </CRow>
                    <CRow>
                         <CFormInput placeholder='Height ' onChange={(e)=>setheight(e.target.value)}/>
                    </CRow>
               
               
               
                </div>
                <div style={{display:'flex', flexDirection:"column", paddingBottom:'10px'}} >
                        <CRow>
                        
                            <label>Weight</label>
                    </CRow>
                    <CRow>
                         <CFormInput placeholder='weight ' onChange={(e)=>setWeight(e.target.value)}/>
                    </CRow>
               
               
               
                </div>
                <div style={{display:'flex', flexDirection:"column", paddingBottom:'10px'}} >
                        <CRow>
                        
                            <label>Blood Type</label>
                    </CRow>
                    <CRow>
                         <CFormInput placeholder='Blood Type ' onChange={(e)=>setbloodType(e.target.value)}/>
                    </CRow>
               
                </div>
                <div style={{display:'flex', flexDirection:"column", paddingBottom:'10px'}} >
                        <CRow>
                        
                            <label>Allergies</label>
                    </CRow>
                    <CRow>
                         <CFormInput placeholder='Allegies ' onChange={(e)=>setallergies(e.target.value)}/>
                    </CRow>
               
                </div>
                <div style={{display:'flex', flexDirection:"column", paddingBottom:'10px'}} >
                        <CRow>
                        
                            <label>Diseases</label>
                    </CRow>
                    <CRow>
                         <CFormInput placeholder='Diseases' onChange={(e)=>setdiseases(e.target.value)}/>
                    </CRow>
            
                </div>
                <div className="d-grid">
                  <CButton color="success" type='submit'>Submit </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
  )
}

export default MedicalInformation