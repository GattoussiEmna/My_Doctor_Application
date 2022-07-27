import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { CCard, CCardBody, CCol, CModal, CModalBody, CModalHeader, CModalTitle, CRow, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import SendIcon from '@mui/icons-material/Send';
import { Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ScienceIcon from '@mui/icons-material/Science';

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
function PateintRecord() {
  const [record, setRecord]=useState([]);
  const selector = useSelector(state=>state.user)
  const id= selector.user._id;
  const [visible,setVisible]=useState(false);
  const [labList, setLabList]=useState([]);
  const [analyseId, setAnalyseId]= useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [prescriptionData, setPrescriptionData]=useState([]);
  const [analyseData, setAnalyseData] = useState([]);
  const [diagnostiqueData, setDiagnostiqueData]=useState([]);


  let downloadHandler = (e) =>{
   console.log('button click' , e);
  axios.get( `http://localhost:5000/diagnostiques/getPateintFile/${e}`,{
     responseType: 'arraybuffer',
     headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
              },
  }).then(response => {
         console.log(response.data);
         const url = window.URL.createObjectURL(new Blob([response.data]));
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', 'file.pdf');
         document.body.appendChild(link);
         link.click();
         
        
        }).catch(err =>alert(err));     
}
 const getLabList = ()=>{
    axios.get("http://localhost:5000/lab/getLabList")
    .then((res)=>{
      console.log(res.data)
      setLabList(res.data)
    }).catch((err)=>console.log(err))
  }
   const handelAnalyse = (args)=>{
     setAnalyseId(args);
     getLabList();
     setVisible(!visible)
   }
  useEffect(()=>{
    axios.get(`http://localhost:5000/dossierMedicals/getPateintMedicalRecord/${id}`)
    .then((res)=>{
      if(res.data.data){
       setRecord(res.data.data);
       getPatientDiagnostique(id)
       getPrescription(id);
       getAnalyse(id)
     
    }
      console.log("patient record" ,res.data)
    })
    .catch((err)=>console.log(err))
  },[]);

  const getPatientDiagnostique =(args)=>{
    axios.get(`http://localhost:5000/diagnostiques/getPAtientDiagnostique/${args}`)
    .then((res)=>{
     // setRecord(res.data.data );
      console.log('patient diagnostique',res.data.data)
     
      
     setDiagnostiqueData(res.data.data)
    })
    .catch((err)=>console.log(err))
}
  const getPrescription =(args)=>{
    
    axios.get(`http://localhost:5000/ordonnances/patientOrdonance/${args}`)
    .then((res)=>{
     console.log("prescription", res.data);
     setPrescriptionData(res.data.data);
 }).catch((err)=>console.log(err))
}

const getAnalyse =(args)=>{
 
   axios.get(`http://localhost:5000/analyses/getAnalyseByPatientId/${args}`)
  .then((res)=>{
   console.log("analyse", res.data.data);

   setAnalyseData(res.data.data);
}).catch((err)=>console.log(err))
 };
  const chooseLab = (args)=>{
     setIsLoad(true);
     console.log('analyse id',analyseId)
     console.log("lab id", args)
     axios.put(`http://localhost:5000/analyses/updateAnalyseBYLABOID/${analyseId}`, {args})
     .then((res)=>{
       console.log(res.data);
       alert(res.data.message)
     
       setIsLoad(false);
       setVisible(false);
       window.location.reload();
     }).catch((err)=>console.log(err))
  }
  const downloadPrescription =(args)=>{
     console.log('button click' , args);
     axios.get( `http://localhost:5000/ordonnances/ordonanceFile/${args}`,{
      responseType: 'arraybuffer',
      headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
              },
     }).then(response => {
        console.log(response.data);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
        
       
       }).catch(err =>alert(err));     

  }
   // ANALYSE FILE
   let downloadAnayleFile = (e) =>{
  
    console.log('button click' , e);
    axios.get( `http://localhost:5000/analyses/getAnalyseFile/${e}`,{
      responseType: 'arraybuffer',
      headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/pdf'
               },
   }).then(response => {
       
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf');
          document.body.appendChild(link);
          link.click();
          
         
         }).catch(error =>{
         console.log( error) 
         });     
 }
  return (
   <>
       <CRow>
     
     <CCol>
       <CCard>
          <CCardBody>
     <h5>Patient information</h5>
   <CTable hover>
   <CTableHead >
                      
                    </CTableHead>
                    <CTableHead >
                      <CTableRow>
                      <CTableHeaderCell scope="col"> Name</CTableHeaderCell>
                    
                       <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                       <CTableHeaderCell scope="col">weight</CTableHeaderCell>
                       <CTableHeaderCell scope="col">height</CTableHeaderCell>
                      
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                   
                      {
                        record.length >0 ?
                         record.map((app)=>(
                           <CTableRow key={app._id}>
                           <CTableDataCell scope="col">{app.user.firstName}{" "}{app.user.lastName} </CTableDataCell>
                           <CTableDataCell scope="col">{app.user.gender} </CTableDataCell>
                           <CTableDataCell scope="col">{app.weight} </CTableDataCell>

                           <CTableDataCell scope="col">{app.height} </CTableDataCell>


                           </CTableRow>
                         ))
                         :null
                      }
                   
                     
                    
                    </CTableBody>
                  </CTable>

   <h5>General Medical History</h5>
   <CTable hover>
   <CTableHead >
                      
                    </CTableHead>
                    <CTableHead >
                      <CTableRow>
                      <CTableHeaderCell scope="col"> BloodType</CTableHeaderCell>
                    
                       <CTableHeaderCell scope="col">Allergies</CTableHeaderCell>
                       <CTableHeaderCell scope="col">Diseases</CTableHeaderCell>
                       
                      
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                   
                      {
                        record.length >0 ?
                         record.map((app)=>(
                           <CTableRow key={app._id}>
                          
                           <CTableDataCell scope="col">{app.bloodType} </CTableDataCell>
                           <CTableDataCell scope="col">{app.allergies} </CTableDataCell>

                           <CTableDataCell scope="col">{app.diseases} </CTableDataCell>


                           </CTableRow>
                         ))
                         :null
                      }
                   
                     
                    
                    </CTableBody>
   </CTable>

   <h5>Diagnostice </h5>
   <CTable >
   <CTableHead >
                      
                    </CTableHead>
                    <CTableHead >
                      <CTableRow>
                      <CTableHeaderCell scope="col"> Doctor</CTableHeaderCell>
                      <CTableHeaderCell scope="col"> Description</CTableHeaderCell>

                       <CTableHeaderCell scope="col">file</CTableHeaderCell>
                      
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                   
                      {
                        diagnostiqueData?.length >0 ?
                        diagnostiqueData?.map((app)=>(
                           <CTableRow key={app._id}>
                          
                          <CTableDataCell scope="col"
                          >{app.doctorId?.firstName} {" "}{app?.doctorId?.lastName}  
                           </CTableDataCell>
                           <CTableDataCell scope="col">{app?.description ? app?.description : "No Diagnostique yet.."} 
                           
                           
                           </CTableDataCell>
                           <CTableDataCell>
                           {app?.description ?
                             <IconButton onClick={()=>downloadHandler(app._id)}>
                             <ExpandCircleDownIcon color='primary' />

                            
                           </IconButton>
                            : ""} 
                          
                           </CTableDataCell>
                     
                           
                       
                        


                           </CTableRow>
                         ))
                         :null
                      }
                   
                     
                    
                    </CTableBody>
   </CTable>
   <h5>Analyse</h5>
   <CTable>
     <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col"> Name</CTableHeaderCell>
                    
                       <CTableHeaderCell scope="col"></CTableHeaderCell>
                      
                      </CTableRow>

     </CTableHead>
     <CTableBody>
     {
                        analyseData?.length >0 ?
                        analyseData?.map((analyse)=>(
                           <CTableRow key={analyse?._id}>
                           <CTableDataCell scope="col">{analyse.name ? analyse?.name  :"no analyse yet" } 
                           
                           </CTableDataCell>
                           <CTableDataCell>
                             {analyse?.patientSend ?
                                                     analyse?.labSend ?
                                                   
                                                      <IconButton onClick={()=>downloadAnayleFile(analyse?._id)}>
                                                       <ExpandCircleDownIcon color='primary' />
                                                     </IconButton>
                                                     :
                                                      <HourglassBottomIcon/>
                                                      : 
                                                      analyse?.name ?
                                                      <Tooltip title="Send Analyse">
                                                      <IconButton onClick={()=>handelAnalyse(analyse?._id)} >
                                                        <SendIcon color='primary'/>
                                                      </IconButton>
                                                    </Tooltip>    
                                                      : ""
                                                              
                             }
                            
                           
                           </CTableDataCell>
                     
                           </CTableRow>
                         ))
                         :<CSpinner></CSpinner>
                      }
     </CTableBody>
   </CTable>
   <h4>Prescription</h4>
   <CTable>
     <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col"> Description</CTableHeaderCell>
                    
                       <CTableHeaderCell scope="col">File</CTableHeaderCell>
                      
                      </CTableRow>
     </CTableHead>
     <CTableBody>
       {prescriptionData.map((or)=>(
         <CTableRow key={or?._id}>
           <CTableDataCell>
             {or?.description ? or?.description : "No Prescription Yet"}
           
           
            </CTableDataCell>
           <CTableDataCell>
           {or?.description ?
            <IconButton onClick={()=>downloadPrescription(or._id)}>
            <ExpandCircleDownIcon color='primary' />

           
</IconButton>
            : ""}

            
           </CTableDataCell>
         </CTableRow>
       ))}
     </CTableBody>
   </CTable>
   </CCardBody>
       </CCard>
     </CCol>
  

   </CRow>
   <CModal visible={visible} onClose={()=>setVisible(false)}>
     <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Send Analyse</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h6>Lab List</h6>
        {labList.length >0 ?
                 labList.map((lab)=>
                 <>
                            
                 <ListItem key={lab._id}
                  secondaryAction={
                 <Tooltip title='Send Analyse'>
                   <IconButton onClick={()=>chooseLab(lab._id)} disabled={isLoad}  >
                     <SendIcon color="secondary"/>
                  </IconButton> 
               </Tooltip>
           
             }
          >
           <ListItemAvatar>
           <ScienceIcon   />
              
           
           </ListItemAvatar>
           <ListItemText
               primary={lab.name }
               secondary={
                   <React.Fragment>
                   <Typography
                       sx={{ display: 'inline' }}
                       component="span"
                       variant="body2"
                       color="text.primary"
                   >
                      {lab.address}
                   </Typography>
                      {" -"}
                   </React.Fragment>
              }
            />

           </ListItem>
           <Divider variant="inset"  />
               </>
                 )
                          
                           : <CSpinner></CSpinner>
        }
      </CModalBody>
   </CModal>
   </>
  )
}

export default PateintRecord