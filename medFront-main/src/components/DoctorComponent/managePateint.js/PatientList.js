import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CForm,   CFormInput, CButton, CInputGroup, CInputGroupText, CModal, CModalBody, CModalHeader, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CRow, CCol } from '@coreui/react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, IconButton, Toolbar, Tooltip } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


function PatientList() {
    const selector = useSelector(state=>state.user);
    const _id = selector.user._id;
    const [appointementData, setAppointementData]=useState([]);
    
    const [file,setFile]=useState(null);
    const [description, setDescription]=useState("");
    const [visible, setVisible]=useState(false);
    const [patientRec, setPatientRec]=useState([]);
    const [showDiag, setShowDiag]=useState(false);
    const [diagnostiqueData, setDiagnostiqueData]=useState([]);
    const [patientId, setPatientId]=useState("");
    const [showPres, setShowPres]=useState(false);
    const [showAnalys, setShowAnalyse]=useState(false);
    const [ordoDesc, setOrdoDesc]=useState(false);
    const [ordonnancefile, setOrdonnancefile]=useState(null);
    const [prescriptionData, setPrescriptionData]=useState([]);
    const [showPresUpdate, setShowPresUpdate]=useState(false);
    const [updatePrescDescr, setUpdatePresDescr]=useState("");
    const [updatePrescFile, setUpdatePresFile]=useState(null);
    const [showDiagUpdate, setShowDiagUpdate]= useState(false);
    const [updateDiagDesc, setUpdateDiagDes]=useState("");
    const [updateDiagFile, setUpdateDiagFile]=useState(null);
    const [analyName, setAnalyseName]=useState("");
    const [analyseData, setAnalyseData] = useState([]);
    const [load, setLoad]= useState(false);
    const [medicalRecordId, setMedicalRecordId] = useState("");
    useEffect(()=>{
        getPateintList();
        getPatientDiagnostique(_id);
      },[]);

    const getPateintList =()=>{
        axios.get(`http://localhost:5000/appointments/getPatient/${_id}`)
        .then((res)=>{
          console.log(res.data.data  , 'user id')
          let pp = res.data.data.filter
          ( (ele, ind) => ind === res.data.data.findIndex(elem => elem.userId._id === ele.userId._id))

          console.log("new tab", pp)
          setAppointementData(pp)
        }).catch((err)=>console.log(err));
    }
    const getPateintRecord =(args)=>{
        console.log(args , 'clicked')
        axios.get(`http://localhost:5000/dossierMedicals/getPateintMedicalRecord/${args}`)
        .then((res)=>{
         // setRecord(res.data.data);
          console.log('doc patient recod',res.data.data)
         
           setPatientId(args)
          if(res.data.data){
            setMedicalRecordId(res.data.data[0]._id)
              //setLoad(true)
             setPatientRec(res.data.data);
             // getPatientDiagnostique(args);
             getPrescription(args);
             getAnalyse(args)
              setVisible(!visible);
              
          }
        })
        .catch((err)=>console.log(err))
    }
    const getPatientDiagnostique =(args)=>{
        axios.get(`http://localhost:5000/diagnostiques/getUserDiagnostique/${args}`)
        .then((res)=>{
         // setRecord(res.data.data);
          console.log('patient diagnostique',res.data.data)
         
          
         setDiagnostiqueData(res.data.data)
        })
        .catch((err)=>console.log(err))
    }
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
     // PRESCRIPTION FILE
     let downloadPrescriptionFile = (e) =>{
        const fileName = e;
        console.log('button click' , e);
        axios.get( `http://localhost:5000/ordonnances/ordonanceFile/${e}`,{
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
      const AddDiagnostic =()=>{
       setLoad(true)
        console.log(_id )
        const formData = new FormData();
        formData.append('file', file);
        formData.append('medicalRecordId', medicalRecordId);
        formData.append('description', description);
        formData.append('userId', patientId);
        formData.append('doctorId', _id);
        axios.post('http://localhost:5000/diagnostiques/Adddiagnostique', formData)
        .then((res)=>{
            alert(res.data.message);
            setLoad(false);
            setShowDiag(!showDiag)

        }
            )
        .catch((err)=>console.log(err))
      }
    // ADD PRescription function
    const AddPrescription =()=>{
        const formData = new FormData();
        formData.append('file', ordonnancefile);
        formData.append('description', ordoDesc);
        formData.append('userId', patientId);
        formData.append('doctorId', _id)
        axios.post('http://localhost:5000/ordonnances/Addordonnance', formData)
        .then((res)=>{
            console.log(res)
            alert(res.data.message)
         })
        .catch((err)=>console.log)
    }
   const getPrescription =(args)=>{
    
          const userId= args;
          const doctorId= _id
          console.log("get pre", args, _id)
       axios.post("http://localhost:5000/ordonnances/getPrescriptionDoctor", {userId, doctorId})
       .then((res)=>{
           console.log("prescription", res.data);
           setPrescriptionData(res.data.data);
       }).catch((err)=>console.log(err))
   }
   const DeletePrescription = (args)=>{
       console.log(args)
       axios.delete(`http://localhost:5000/ordonnances/deleteordonnance/${args}`,{ headers: {"Authorization" : `Bearer ${args}`} })
       .then((res)=>{
           alert(res.data.message)
       }).catch((err)=>console.log(err))
   }
   //UPDATE PRESCRIPTION
   const updatePrescription =(args)=>{
       console.log(updatePrescFile)
    const formData = new FormData();
    formData.append('file', updatePrescFile);
    formData.append('description', updatePrescDescr);
          axios.put(`http://localhost:5000/ordonnances/updateordonnance/${args}`, formData)
          .then((res)=>{
              console.log(res.data);
              alert(res.data.message);
          }).catch((err)=>console.log(err)) 
   }
   //Update Diagnostic
   const updateDiagnostic =(args)=>{
    setLoad(true)
    const formData = new FormData();
    formData.append('file', updateDiagFile);
    formData.append('description',updateDiagDesc );
          axios.put(`http://localhost:5000/diagnostiques/updatediagnostique/${args}`, formData)
          .then((res)=>{
              console.log(res.data);
              alert(res.data.message);
              setLoad(false);
              setShowDiagUpdate(!showDiagUpdate)
          }).catch((err)=>console.log(err)) 
   }
   // ADD ANALYSE 
   const AddAnalys =()=>{
    const userId =patientId;
    const doctorId = _id;
    const name = analyName;
    axios.post("http://localhost:5000/analyses/Addanalyse", {userId, doctorId,name})
    .then((res)=>{
        console.log(res.data)
        alert(res.data.message)
    }).catch((err)=>console.log(err))
   }
   const getAnalyse =(args)=>{
    const userId= args;
    const doctorId= _id
    console.log("get pre", args, _id)
     axios.post("http://localhost:5000/analyses/getAnalysForDoc", {userId, doctorId})
    .then((res)=>{
     console.log("analyse", res.data.data);
  
     setAnalyseData(res.data.data);
 }).catch((err)=>console.log(err))
   };
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
       
          let arrayBufferConverted = JSON.parse(
            String.fromCharCode.apply(null, new Uint8Array(response.data))
              )
              console.log("file",arrayBufferConverted);
       /*   const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf');
          document.body.appendChild(link);
          link.click();
          */
         
         }).catch(error =>{
         console.log( error) 
         });     
 }
  return (
    <>
      <CTable>
         <CTableHead color="dark">
         <CTableRow>
           
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Adress</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
         </CTableRow>
         </CTableHead>
         <CTableBody>
             { appointementData.length >0 ?
              appointementData?.map((u)=>(
                <CTableRow key={u._id}>
           
                <CTableDataCell scope="col" >{u.userId.firstName}{" "}{u.userId.lastName} </CTableDataCell>
                <CTableDataCell>{u.userId.adresse}  </CTableDataCell>
                <CTableDataCell>{u.userId.email} </CTableDataCell>
                <CTableDataCell>
                    <Tooltip title='Medical Record'>
                        <IconButton disabled={load} onClick={()=>getPateintRecord(u.userId._id)}>
                            <AssignmentIcon/>
                        </IconButton>
                    </Tooltip>
              
                </CTableDataCell>
                </CTableRow>
             )) : <CSpinner></CSpinner>
             }
      
        </CTableBody>
        
      </CTable> 
      <CModal  size="xl"   visible={visible} onClose={()=>setVisible(false)}>
          <CModalHeader>
              Medical Record
          </CModalHeader>
          {setPatientRec.length>0 ?
                                    <CModalBody>
                                    <h4>General information</h4>
                                    <CTable >
                                       <CTableHead   color="dark">
                                          <CTableRow>
                                  
                                              <CTableHeaderCell scope="col">Weight</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">Height</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">BloodType</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">Allergies</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">Diseases</CTableHeaderCell>
                                          </CTableRow>
                      
                                       </CTableHead>
                                       <CTableBody>
                                           {patientRec.length >0 ?
                                             patientRec.map((pa)=>(
                                                   <CTableRow key={pa._id}>
                                                      <CTableDataCell>{pa.weight} </CTableDataCell>
                                                      <CTableDataCell>{pa.height} </CTableDataCell>
                                                      <CTableDataCell>{pa.bloodType} </CTableDataCell>
                                                      <CTableDataCell>{pa.allergies} </CTableDataCell>
                                                      <CTableDataCell>{pa.dis} </CTableDataCell>
                                                    </CTableRow>
                                             ))
                                            
                                           :null
                                           }
                                         
                                       </CTableBody>
                                    </CTable>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:'10px'}}>
                                        <div>
                                           <h4>Diagnostic</h4>
                                        </div>
                                        <div>
                                           <CButton  onClick={()=>setShowDiag(!showDiag)}>
                                               Add Diagnostic
                                            </CButton>  
                                        </div>
                                    </div>
                                    {
                                                      showDiag ? 
                                                      <CTableRow>
                                                      <CTableDataCell colSpan="2"> 
                                                      <CRow>
                                                          <CCol xs>
                                                              <CFormInput placeholder="Description"  onChange={(e)=>setDescription(e.target.value)}/>
                                                          </CCol>
                                                          <CCol xs>
                                                              <CFormInput  type="file" aria-label="Last name"  onChange={(e)=> setFile(e.target.files[0])}/>
                                                          </CCol>
                                                          
                                                          
                                                          </CRow>
                                                          <CRow>
                                                              <CCol><CButton style={{marginTop:"10px", marginBottom:"10px"}} onClick={()=>AddDiagnostic()} disabled={load} >Submit</CButton>     </CCol>
                                                          </CRow>
                                                      </CTableDataCell>
                                                       </CTableRow>
                                                      :null
                                                  }
                                   
                                    <CTable  >
                                       <CTableHead  color="dark">
                                          <CTableRow>
                                  
                                              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">file</CTableHeaderCell>
                                             
                                          </CTableRow>
                      
                                       </CTableHead>
                                       <CTableBody>
                                           {diagnostiqueData.length >0 ?
                                             diagnostiqueData.map((pa)=>(
                                                 <> 
                                                  <CTableRow key={pa._id}>
                                                      <CTableDataCell>
                                                      {showDiagUpdate ? 
                                                                       <input onChange={(e)=>setUpdateDiagDes(e.target.value)} placeholder={pa.description}/>
                                                                      :
                                                                        pa.description
                                                       }
                                                       </CTableDataCell>
                                                       <CTableDataCell>
                                                     {showDiagUpdate?
                                                                      <div style={{display:'flex', justifyContent:'space-between'}}>
                                                                      <input type='file' onChange={(e)=>setUpdateDiagFile(e.target.files[0])} />
                                                                      <div>
                                                                         <Button color="secondary" variant="outlined" 
                                                                                 style={{marginRight:'5px'}}
                                                                                 onClick={()=>updateDiagnostic(pa._id)} disabled={load}> Update</Button>
                                                                         <Button  color="error" variant="outlined" onClick={()=>setShowDiagUpdate(!showDiagUpdate)}>Cancel</Button>
                                                                      </div>
                                                                    
                                                                     </div>
                                                                    :
                                                                    <>
                                                                    <IconButton onClick={()=>downloadHandler(pa._id)}>
                                                                      <ExpandCircleDownIcon color='primary' />
                      
                                                                      </IconButton>
                                                                      <IconButton >
                                                                      <EditIcon color='success' onClick={()=>setShowDiagUpdate(!showDiagUpdate)} />
                      
                                                                      </IconButton>
                                                                      
                                                                    </>
                                                      }
                                                          
                                                      </CTableDataCell>
                                                    
                                                  </CTableRow>
                                                  
                                              
                                                   
                                                 </>
                                                 
                                             ))
                                            
                                           :null
                                           }
                                         
                                       </CTableBody>
                                    </CTable>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:'10px'}}>
                                        <div>
                                           <h4>Analysis</h4>
                                        </div>
                                        <div>
                                           <CButton onClick={()=>setShowAnalyse(!showAnalys)} >
                                               Add Analysis
                                            </CButton>  
                                        </div>
                                    </div>
                                    {
                                                      showAnalys ? 
                                                      <CTableRow>
                                                      <CTableDataCell colSpan="2"> 
                                                      <CRow>
                                                          <CCol xs>
                                                              <CFormInput placeholder="Name"  onChange={(e)=>setAnalyseName(e.target.value)}/>
                                                          </CCol>
                                                          
                                                          
                                                          
                                                          </CRow>
                                                          <CRow>
                                                              <CCol><CButton style={{marginTop:"10px", marginBottom:"10px"}} onClick={AddAnalys} >Submit</CButton>     </CCol>
                                                          </CRow>
                                                      </CTableDataCell>
                                                       </CTableRow>
                                                      :null
                                    }
                                    <CTable>
                                    <CTableHead  color="dark">
                                          <CTableRow>
                                  
                                              <CTableHeaderCell scope="col">Analyse</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">Resultat</CTableHeaderCell>
                                              
                                          </CTableRow>
                                          </CTableHead>
                                          <CTableBody>
                                           {analyseData.length >0 ?
                                             analyseData.map((anal)=>(
                                                 <> 
                                                  <CTableRow key={anal._id}>
                                                     
                                                      <CTableDataCell>
                                                         {anal.name}
                                                      </CTableDataCell>
                                                      <CTableDataCell>
                                                    {anal.labSend ?
                                                      <Tooltip title="Download File" >
                                                      <IconButton onClick={()=>downloadAnayleFile(anal._id)}>
                                                       <ExpandCircleDownIcon color='primary'/>

                                                      </IconButton>
                                                    </Tooltip>
                                                    : 
                                                    <HourglassBottomIcon/>

                                                   }
                                                    
                                                      </CTableDataCell>
                                                    
                                                  </CTableRow>
                                             
                                              
                                                   
                                                 </>
                                                 
                                             ))
                                            
                                           :null
                                           }
                                         
                                       </CTableBody>
                                       
                                    </CTable>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:'10px'}}>
                                        <div>
                                           <h4>Prescription</h4>
                                        </div>
                                        <div>
                                           <CButton onClick={()=>setShowPres(!showPres)}  >
                                              Add Prescription
                                            </CButton>  
                                        </div>
                                    </div>
                                    {
                                                      showPres ? 
                                                      <CTableRow>
                                                      <CTableDataCell colSpan="2"> 
                                                      <CRow>
                                                          <CCol xs>
                                                              <CFormInput placeholder="Ordonance Description"  onChange={(e)=>setOrdoDesc(e.target.value)}/>
                                                          </CCol>
                                                          <CCol xs>
                                                              <CFormInput  type="file"   onChange={(e)=> setOrdonnancefile(e.target.files[0])}/>
                                                          </CCol>
                                                          
                                                          
                                                          </CRow>
                                                          <CRow>
                                                              <CCol><CButton style={{marginTop:"10px", marginBottom:"10px"}} onClick={AddPrescription} >Submit</CButton>     </CCol>
                                                          </CRow>
                                                      </CTableDataCell>
                                                       </CTableRow>
                                                      :null
                                    }
                                     <CTable  >
                                       <CTableHead  color="dark">
                                          <CTableRow>
                                  
                                              <CTableHeaderCell scope="col">Create at</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                              <CTableHeaderCell scope="col">File</CTableHeaderCell>
                                          </CTableRow>
                      
                                       </CTableHead>
                                       <CTableBody>
                                           {prescriptionData.length >0 ?
                                             prescriptionData.map((presc)=>(
                                                 <> 
                                                  <CTableRow key={presc._id}>
                                                      <CTableDataCell>
                                                        { moment(presc.createdAt).format("YYYY-MM-DD HH:MM")} 
                                                      </CTableDataCell>
                                                      <CTableDataCell>
                                                          {showPresUpdate ? 
                                                                              <input  value={updatePrescDescr} onChange={(e)=>setUpdatePresDescr(e.target.value)} />
                                                                              :  
                                                                               presc.description
                                                          }
                                                           
                                                      </CTableDataCell>
                                                       <CTableDataCell>
                                                           {showPresUpdate ? 
                                                                           <div style={{display:'flex', justifyContent:'space-between'}}>
                                                                               <input type='file' onChange={(e)=>setUpdatePresFile(e.target.files[0])} />
                                                                               <div>
                                                                                  <Button color="secondary" variant="outlined" 
                                                                                          style={{marginRight:'5px'}}
                                                                                          onClick={()=>updatePrescription(presc._id)} > Update</Button>
                                                                                  <Button  color="error" variant="outlined" onClick={()=>setShowPresUpdate(!showPresUpdate)}>Cancel</Button>
                                                                               </div>
                                                                             
                                                                           </div>
                                                                        
                                                                          :
                                                                          <>
                                                                            <Tooltip title="Download File" >
                                                                              <IconButton onClick={()=>downloadPrescriptionFile(presc._id)}>
                                                                               <ExpandCircleDownIcon color='primary'/>
                      
                                                                              </IconButton>
                                                                            </Tooltip>
                                                                          <Tooltip title='edit' onClick={()=>setShowPresUpdate(!showPresUpdate)}>
                                                                             <IconButton >
                                                                             <EditIcon color='success' />
                      
                                                                           </IconButton>
                                                                          </Tooltip>
                                                                          <Tooltip title="Delete">
                                                                          <IconButton onClick={()=>DeletePrescription(presc._id)}>
                                                                             <DeleteIcon color='error' />
                                                                          </IconButton>
                                                                          </Tooltip>
                                                                          </>
                                                           }
                                                         
                                                        
                                                      </CTableDataCell>
                                                    
                                                  </CTableRow>
                                             
                                              
                                                   
                                                 </>
                                                 
                                             ))
                                            
                                           :null
                                           }
                                         
                                       </CTableBody>
                                    </CTable>
                                </CModalBody>
                                   : <CSpinner></CSpinner>
           }
         
      </CModal>
      
    </>
  )
}

export default PatientList