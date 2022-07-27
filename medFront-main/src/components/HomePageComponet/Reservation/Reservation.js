import React, { useEffect, useState } from 'react'
import HomePage from 'src/HomePage'
import Footer from '../Footer/Footer';
import axios from 'axios';
import { CDropdown, CDropdownItem,CDropdownToggle,CDropdownMenu, CButton, CLink, CSpinner, CModal, CHeader, CModalBody, CModalHeader, CModalFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
import "./Reservation.css"
import { useNavigate   } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import avatar from "../../../images/avatar.png"
import { useDispatch } from 'react-redux';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
    
function Reservation() {
    const [specialite, setSpecialite]=useState([]);
    const [specialisation, setSpecialisation] = useState("");
    const [speId, setSpeId]= useState("")
    const [doctor, setDoctor] = useState([]);
    let navigate  = useNavigate  ();
    const dispatch = useDispatch();
    const [visible, setVisible]= useState(false);
    
    // Get Specialisation function
    const getSpecialisation =()=>{
        axios.get('http://localhost:5000/specialite/getSpecialite')
        .then((res)=>{
           setSpecialite(res.data);
          //  console.log("speciali",res.data)
        }
        
        ).catch(err=>console.log(err))
    }
    // Get All Doctor List Fuction
    const getDoctor =()=>{
        axios.get(`http://localhost:5000/users/getUserbyrole/Doctor`)
        .then((res)=>(
            setDoctor(res.data.data)
         //console.log(res.data.data)
        )).catch(err=>console.log(err))
    }
    useEffect(() => {
      getSpecialisation();
      getDoctor();
      console.log(doctor);
      },[]);
    // Search Doctor 
    const getDoctorBySpecialisaition =()=>{
        setDoctor([]);
        console.log('on click', specialisation)
        if(speId !== ""){
            axios.post(`http://localhost:5000/users/getDoctorBySpecialisation`,{speId} )
           .then((res)=>(
          //    console.log('find by sp',res.data.data)
           setDoctor(res.data.data)
        )).catch(err=>console.log(err))
        }
        
    }
    const handelReservation =(item)=>{
      console.log('doc inf', item)
      setVisible(!visible);
        dispatch({

            type: 'setDoctor',
            doctor : item
          })
     
     }
     const handelLogin=()=>{
           navigate('/login', {
               state: {
                   reservation:true
               }
           })
     }
     const goToRegitration = ()=>{
      navigate('/register', {
        state: {
            appointment:true
        }
    });
     }
  return (
      <>
      <HomePage/>
       <div  className='reservation'>
          <div className='reservation_filter'>
          <Autocomplete
                            color='primary'
                            disablePortal
                            id="combo-box-demo"
                            onChange={(event, newValue) => {
                              if(newValue !=null){
                                setSpeId(newValue._id)
                              }
                            
                              
                            }}

                           
                            onInputChange={(event, newInputValue) => {
                              setSpecialisation(newInputValue);
                           
                            }}
                            inputValue={specialisation}
                           
                            options={specialite}
                            getOptionLabel={(option) =>`${option.name}`}
                            
                            sx={{ width: 300 }}
                            renderInput={(params) =>
                               <TextField {...params} label="Specialite" />}
                          /> 
             {/**
              *     <CDropdown className="m-1">
                    <CDropdownToggle >
                      {specialisation? specialisation :<span>Choose Specialisation</span>  }     
                    </CDropdownToggle>
                    <CDropdownMenu >
                    
                    {
                        specialite?.length>0 ?
                    specialite.map((spe)=>
                                <>
                                <CDropdownItem  key={spe?._id} onClick={()=>setSpeId(spe?._id)}  >{spe.name}  </CDropdownItem>
                                </>
                        ) : <CSpinner/>
                    }
                        
                        
                    </CDropdownMenu>
                </CDropdown>
              */}
                <div style={{marginLeft:'10px'}}>
                    <CButton color="primary" onClick={getDoctorBySpecialisaition}>
                        <CIcon  icon={cilSearch} ></CIcon>
                    </CButton>
                </div>
          </div>
          <div className='reservation_doctorList'>
              {
                 doctor?.length>0 ?
                 doctor.map((doc)=>
                <div className="flip-card"  key={doc.id}>
             {  console.log("doc map",doc)}

                <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <img src={`http://localhost:5000/users/getPic/${doc._id}`} alt="Avatar" style={{width:"300px",height:"300px"}}/>
                    <div className='doctor_card_body'>
                          <div>
                             Doctor {doc.firstName}{" "}{doc.lastName}
                          </div>
                          <div className='doctor_spe'> 
                           {doc?.specialisation?.name}
                          </div>
                          <div className='doc_adress'>
                           <LocationOnIcon/> 
                           {doc.adresse}
                          </div>
                      </div>  
                    </div>
                    <div className="flip-card-back">
                    
                    <p> {doc.bio} </p> 
                    <CButton onClick={()=>handelReservation(doc)} > Get Appointement </CButton>
                    </div>
                </div>
                </div>
              )
              : <CSpinner></CSpinner> 
            }
          
          </div>
       </div>
      <Footer/>
     <CModal visible={visible} onClose={()=>setVisible(false)} >
        <CModalHeader></CModalHeader>
        <CModalBody>
            You have to sign in first to get an appointment
            
        </CModalBody>
        <CModalFooter>
             <CButton onClick={handelLogin} >LogIn </CButton> or
            <CButton color='secondary' onClick={goToRegitration}>Create an account</CButton>
        </CModalFooter>
     </CModal>
      </>
   

  )
}

export default Reservation