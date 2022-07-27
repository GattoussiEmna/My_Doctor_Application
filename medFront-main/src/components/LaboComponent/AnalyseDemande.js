import { CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { Button, IconButton } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

function AnalyseDemande() {
   const selector = useSelector(state=>state.user);
   const _id = selector.user._id;
   const [analyseDemande, setAnalyseDemande]=useState([]);
   const [payed,setPayed] =useState(false);
   const [file,setFile]= useState(null);
   
  useEffect(()=>{
    console.log(_id)
     axios.get(`http://localhost:5000/lab/getLabBYLABID/${_id}`)
     .then((res)=>{
       console.log(res.data);
       setAnalyseDemande(res.data);
     }).catch((err)=>console.log(err))
  },[])
  // ADD ANALYSE FILE
  const updateAnalyse = (args)=>{
    if(payed === false){
      alert("Pateint should payed")
    }
    else{
         const formDate = new FormData();
        formDate.append("file", file);
        formDate.append("payed", payed);
        axios.put(`http://localhost:5000/analyses/updateanalyse/${args}`, formDate)
       .then((res)=>{
         console.log(res.data)
         alert(res.data.message);
         window.location.reload();

       }).catch((err)=>console.log(err))
    }
 
  }
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
           <CCardHeader>
             Demande Analyse
           </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                <CTableHeaderCell scope="col"> Analyse name</CTableHeaderCell>
                <CTableHeaderCell scope="col"> Patient </CTableHeaderCell>
                <CTableHeaderCell scope="col"> Doctor </CTableHeaderCell>
                <CTableHeaderCell scope="col">Payed  </CTableHeaderCell>
                <CTableHeaderCell scope="col"> Resultat  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {analyseDemande.length>0 ? 
                                        analyseDemande.map((analy)=>(
                                          <CTableRow key={analy._id}>
                                             <CTableDataCell>{analy.name} </CTableDataCell>
                                             <CTableDataCell>{analy.userId?.firstName} {" "}{analy.userId?.lastName}
                                             </CTableDataCell>
                                             <CTableDataCell>{analy.doctorId?.firstName}{" "}{analy.doctorId?.lastName}
                                              </CTableDataCell>
                                              {analy.labSend ?
                                              
                                                <CTableDataCell>
                                                   <Checkbox disabled />
                                                </CTableDataCell>
                                                :
                                                  <CTableDataCell>
                                                  <Checkbox defaultChecked={payed} onChange={()=>setPayed(true)} />
                                                  </CTableDataCell>
                                              }
                                          
                                             <CTableDataCell>
                                             {analy.labSend ? 
                                                                      <IconButton>
                                                                      <ExpandCircleDownIcon color='primary' onClick={(e)=>downloadAnayleFile(analy._id)} />   
                                                                      </IconButton>
                                                                      :
                                                                      <>
                                                                        <input type='file' onChange={(e)=>setFile(e.target.files[0]) } />
                                                                        <Button color='secondary' variant="outlined" onClick={()=>updateAnalyse(analy._id)}  >Send</Button>
                                                                      </>
                                              } 
                                             </CTableDataCell>
                                          </CTableRow>
                                        )) 
                                        : <CSpinner  color="success"/> 
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

export default AnalyseDemande