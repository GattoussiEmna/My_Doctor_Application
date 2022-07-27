import { CButton, CTableHead, CHeader, CCol, CRow, CCardBody, CTable, CTableRow, CTableHeaderCell, CTableBody, CSpinner, CTableDataCell, CModal, CModalHeader, CModalTitle, CModalBody, CForm, CFormInput, CModalFooter, CInputGroup } from '@coreui/react'
import { FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';


const delay = 5;
  
function Labo() {
  // SHOW SPINNER
  const [show, setShow] = useState(false);

   const [labList, setLabList]=useState([]);
   const [name, setName]=useState("");
   const [Labaddress,setLabAddress]=useState('');
   const [isLoading, setIsLoading]= useState(false);
   const [visibel,setVisible]=useState(false);
   const [next, setNext]=useState(false);
   const [current,setCurrent]=useState(true);
   const [gender, setGender]= useState("");
   const [email,setEmail]=useState("");
   const [password, setPassword]=useState("");
   const [firstName, setFirstName]=useState("");
   const [lastName, setLastName]=useState("");
   const [adresse, setAddress]=useState("");
   const role= "Labo";
 const [labId, setLabId]= useState("");
   useEffect(()=>{
    axios.get("http://localhost:5000/lab/getLabList")
    .then((res)=>{
     setLabList(res.data)
     console.log("lab list",res.data)
    }).catch((err)=>console.log(err))
    let timer1 = setTimeout(() => setShow(true), delay * 1000);

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    return () => {
      clearTimeout(timer1);
    };
   
   },[])
   const AddLAbAdmin = (e)=>{
    e.preventDefault();
    setIsLoading(true);
    axios.post("http://localhost:5000/users/register",{email, password, gender,adresse,firstName,lastName,role})
    .then((res)=>{
      if(res.status==200){
        console.log(res.data);
        console.log("user id", res.data.user._id)
        const _id = res.data.user._id;
        if(_id){
          setLabId(_id);
          setIsLoading(false)
          setCurrent(false);
          setNext(true);
        }
      }
    })
   }
   const AddLAbo = (e)=>{
    e.preventDefault();
    setIsLoading(true);
    const address = Labaddress;
    axios.post("http://localhost:5000/lab/addLab", {name,address, labId})
    .then((res)=>{
      alert(res.data.message);
      window.location.reload();

    })
   }
  return (
    <>
      <CRow>
          <CCol>
              <CHeader>
                  <CButton onClick={()=>setVisible(true)}>ADD LABO</CButton>
              </CHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                   <CTableRow>
                   <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell> 
                    <CTableHeaderCell>LabName</CTableHeaderCell>
                    <CTableHeaderCell>address</CTableHeaderCell> 
                  </CTableRow>   
                  </CTableHead>
                
                  <CTableBody>
                    {labList.length>0 ?
                       labList.map((lab)=>(
                         <CTableRow key={lab._id}>
                           <CTableDataCell>
                             {lab.labId.firstName}{" "}{lab.labId.lastName}
                           </CTableDataCell>
                           <CTableDataCell>
                             {lab.labId.email}
                           </CTableDataCell>
                           <CTableDataCell>
                             {lab.name}
                           </CTableDataCell>
                           <CTableDataCell>
                             {lab.address}
                           </CTableDataCell>
                         </CTableRow>
                       ))
                    : show ? "no lab found" : <CSpinner/>
                    }
                  </CTableBody>
                </CTable>
              </CCardBody>
          </CCol>
      </CRow>


      {/**Add labo  */}
      <CModal visible={visibel} onClose={()=>setVisible(false)}>
        <CModalHeader>
          <CModalTitle>
            Manage Lab
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
           {/* Add Lab Admin First */}
           {current ?
                 <CForm>
                        <h5>ADD Admin lab</h5>

                  <CInputGroup className="mb-3">
                    <CFormInput placeholder="First Name" autoComplete="first Name" 
                                    value={firstName}
                                    onChange={(e)=>setFirstName(e.target.value)}    
                                />
                  </CInputGroup>
                    
                  <CInputGroup className="mb-3">
                                  <CFormInput placeholder="last Name" autoComplete="last Name" 
                                    value={lastName}
                                    onChange={(e)=>setLastName(e.target.value)}    
                                />
                 </CInputGroup>
                 <CInputGroup className="mb-3">
                                  <CFormInput placeholder="email" autoComplete="email" 
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}    
                                />
                 </CInputGroup>
                 <CInputGroup className="mb-3">
                                  <CFormInput placeholder="password" autoComplete="password" 
                                    type='password'
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}    
                                />
                 </CInputGroup>
                 <CInputGroup className="mb-3">
                                  <CFormInput placeholder="address" autoComplete="address" 
                                    value={adresse}
                                    onChange={(e)=>setAddress(e.target.value)}    
                                />
                 </CInputGroup>
                 <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={gender}
                    onChange={(event)=> setGender(event.target.value)}
                  >
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  </RadioGroup>
                <CButton onClick={AddLAbAdmin} disabled={isLoading} >
                  {isLoading? "...Submit" : "Submit"}
                </CButton>
                  </CForm>
            :null}
          {next?
              <CForm>
                <h5> Add Lab Cordonnate</h5>
              <CInputGroup className="mb-3">
               <CFormInput placeholder="Name" autoComplete="Name" 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}    
                           />
             </CInputGroup>
                
             <CInputGroup className="mb-3">
                             <CFormInput placeholder="Address" autoComplete="Address" 
                                value={Labaddress}
                                onChange={(e)=>setLabAddress(e.target.value)}    
                           />
                           </CInputGroup>
                           <CButton type='submit' onClick={AddLAbo} >Submit</CButton>

               </CForm>
               : null
          }  
        </CModalBody>
        <CModalFooter>
 
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Labo