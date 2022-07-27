import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow ,CTableDataCell, CSpinner, CButton} from '@coreui/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment  from 'moment';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function AllPationAppointement() {
    const user = useSelector(state=>state.user);
    const [appo, setAppo]=useState([])
    const id = user.user._id;

    useEffect(()=>{
        axios.get(`http://localhost:5000/appointments/getappointmentByUserID/${id}`)
        .then((res)=>{
           console.log(res.data);
            setAppo(res?.data?.data)
        }
           
        ).catch((err)=>console.log(err))
    },[])
   // Cancel Appointement function
   const handelCancel=(args)=>{
         console.log(args);
         const _id=args
         axios.put(`http://localhost:5000/appointments/cancelAppointement/${_id}`)
         .then((res)=>{
           alert(res.data.message)
             console.log(res.data)
         }).catch()
   }
 
  return (
    <>
        <CRow>
          <CCol>
             <CCard>
                <CCardHeader>All PationAppointement</CCardHeader>
                <CCardBody>
                   <CTable hover>
                     <CTableHead >
                       <CTableRow>
                       <CTableHeaderCell scope="col">Dr</CTableHeaderCell>
                       <CTableHeaderCell scope="col">Specialisation</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Hour</CTableHeaderCell>

                        <CTableHeaderCell scope="col">Confiramation</CTableHeaderCell>
                        
                        <CTableHeaderCell scope="col"></CTableHeaderCell>

                       </CTableRow>
                     </CTableHead>
                     <CTableBody>
                    
                       {
                         appo.length >0 ?
                          appo.map((app)=>(
                            <CTableRow key={app._id}>
                            <CTableDataCell scope="col">{app.doctorId?.firstName}{" "}{app.doctorId?.lastName} </CTableDataCell>
                            <CTableDataCell scope="col">{app.doctorId?.specialisation.name} </CTableDataCell>
                            <CTableDataCell scope="col">{moment(app.date).format("YYYY-DD-MM ")} </CTableDataCell>
                            <CTableDataCell scope="col">{moment(app.date).format("HH:MM")} </CTableDataCell>

                            <CTableDataCell scope="col" >{app.confirm ==true ? 
                                                                          
                                                                              <CheckCircleIcon  color="success" />
                                                                         
                                                                            :
                                                                            <CSpinner></CSpinner>
                                                        } 
                            </CTableDataCell>
                            {app.confirm ==true ? 
                                            null 
                             :
                             <CTableDataCell scope="col">
                             <Tooltip title='Cancel' >
                              <CancelIcon onClick={()=>handelCancel(app._id)} />
                             </Tooltip>
                            
                            </CTableDataCell>
                             }
                          

                            </CTableRow>
                          ))
                          :null
                       }
                    
                      
                     
                     </CTableBody>
                   </CTable>
                </CCardBody>
             </CCard>
          </CCol>
        </CRow>
    </>
  )
}

export default AllPationAppointement