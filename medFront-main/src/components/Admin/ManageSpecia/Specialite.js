import { CRow, CCol, CCardBody, CCardHeader, CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner, CModal, CModalHeader, CModalTitle, CModalBody, CForm, CFormInput, CModalFooter } from '@coreui/react'
import { Button, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
function Specialite() {

  const [specialiteName,setSpecialiteName]=useState("");
  const [specialiteData, setSpecialiteData]=useState([]);
  const [visibel,setVisible]=useState(false);
  const [showEdit, setShowEdit]= useState(false);
  const [updateName, setUpdateName]=useState("");

  useEffect(()=>{
    axios.get('http://localhost:5000/specialite/getSpecialite')
        .then((res)=>(
            //console.log(res.data.data,"spec")
            setSpecialiteData(res.data)
        )).catch(err=>console.log(err))
  },[]);
 
  // ADD Specialte
   const AddSpecialite =()=>{
     axios.post("http://localhost:5000/specialite/createSpecialite", {specialiteName})
     .then((res)=>{
       console.log(res.data)
       alert(res.data.message); 
         window.location.reload();
      // setSpecialiteName("");
       //setVisible(false);
    
      }).catch((err)=>{
        if(err.response.status ==400){
          alert (err.response.data.message)
        }
       console.log(err)
      })
   }
  // DELETE SPECIALITE
  const DeleteSpecialite = (args)=>{
    axios.delete(`http://localhost:5000/specialite/delete/${args}`)
    .then((res)=>{
      console.log(res.data.message);
      alert(res.data.message);
      window.location.reload();
    }).catch((err)=>console.log(err))
  }
  // UPDATE  SPECIALITE
  const UpdateSpecialite = (args)=>{
    axios.put(`http://localhost:5000/specialite/updateSpec/${args}`)
    .then((res)=>{
      console.res(res.data);
      alert(res.data.message)
    }).catch((err)=>console.log(err))
  }
  return (
    <>
      <CRow>
        <CCol>
           <CCardBody>
             <CCardHeader>
               <CButton onClick={()=>setVisible(!visibel)}>ADD Specialite</CButton>
             </CCardHeader>
             <CCardBody>
               <CTable>
                 <CTableHead>
                   <CTableRow>
                   <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                   <CTableHeaderCell scope="col">#</CTableHeaderCell>
                   </CTableRow>
                 </CTableHead>
                 <CTableBody>
                   {specialiteData.length>0?
                                  specialiteData.map((spec)=>(
                                                 <CTableRow key={spec._id}>
                                                   <CTableDataCell key={spec._id}>
                                                     {showEdit? <>
                                                                 <input placeholder={spec.name} onChange={(e)=>setUpdateName(e.target.value)} />
                                                                <Button variant='outline' onClick={()=>UpdateSpecialite(spec._id)}>Update</Button>
                                                                <Button  variant='outline' onClick={()=>setShowEdit(false)}>Cancel</Button>
                                                                </>
                                                              : spec.name
                                                      }
                                                       
                                                    </CTableDataCell>
                                                    <CTableDataCell>
                                                      <Tooltip title='Edit'>
                                                        <IconButton onClick={()=>setShowEdit(!showEdit)}>
                                                          <EditIcon color='success' />
                                                        </IconButton>
                                                      </Tooltip>
                                                      <Tooltip title="Delete">
                                                        <IconButton onClick={()=>DeleteSpecialite(spec._id)}>
                                                          <DeleteIcon color='error'/>
                                                       </IconButton>
                                                      </Tooltip>
                                                     
                                                    </CTableDataCell>
                                                </CTableRow>
                                  ))
                                             
                                           :<CSpinner/>
                    }
                 
                 </CTableBody>
               </CTable>
             </CCardBody>
           </CCardBody>
        </CCol>
      </CRow>
      <CModal visible={visibel} onClose={()=>setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            ADD Specialite
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
          <CFormInput placeholder="Name" autoComplete="Name" 
                           value={specialiteName}
                           onChange={(e)=>setSpecialiteName(e.target.value)}    
                      />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton type='submit' onClick={AddSpecialite}>Submit</CButton>
 
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Specialite