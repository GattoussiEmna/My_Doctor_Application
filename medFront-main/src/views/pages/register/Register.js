import React,{useState, useEffect} from 'react'
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
  CSpinner,
} from '@coreui/react';

import CIcon from '@coreui/icons-react'
import { cilCalendar, cilHome, cilLockLocked, cilUser } from '@coreui/icons'

import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import {useDispatch} from "react-redux"

const Register = () => {

  const role ='Patient';
 const [email,setEmail] =useState("");
 const [password, setPassword]=useState("");
 const [firstName,setFirstName]=useState("");
 const [lastName, setLastName]=useState("");
 const [birthday, setBirthday]=useState("");
 const [adress, setAdress]=useState("");
 const [gender, setGender]= useState("");
 const [avatar, setAvatar]=useState(null);
 const [validated, setValidated] = useState(false);
 const dispatch = useDispatch();
 let navigate  = useNavigate();
const [appoi,setAppoi]=useState(false)
const [wait, setWait]=useState(false)
const location = useLocation(); 


 useEffect(()=>{
  
  console.log(location?.state?.appointment)
 setAppoi(location?.state?.appointment);
},[appoi])

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(email)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    else{
         setValidated(true)
        const formData = new FormData();
        formData.append("email", email);
        formData.append("role", role);
        formData.append("password", password);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("adresse", adress);
        formData.append("gender", gender);
        formData.append("birthday", birthday);
        if(avatar != null){
          formData.append("file", avatar)
        }
        setWait(true)

        axios.post("http://localhost:5000/users/register", formData)
        .then((res)=>{
           console.log(res.data.user)
           const user =  res.data?.user?._id;
          dispatch({
             type: 'setUser',
            user : res.data
          })
          dispatch({
            type: 'onLogin',
            isLogIn : true
          })
           console.log("userId", user)
          if(res.status==200){
            if (appoi == true){
              navigate("/Patientappointment");
            }else {
               navigate("/medicalInformation", {state:{id:user}});

            }
          }
          else{
            alert("something went wrong")
          }
        }).catch((err)=>console.log(err))
    }
 
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
                 onSubmit={handleSubmit}
                 >
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                               required 
                               
                               placeholder="First Name" autoComplete="firstName" onChange={(e)=>setFirstName(e.target.value)} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                                
                                required
                                placeholder="Last Name" autoComplete="lastName" onChange={(e)=>setLastName(e.target.value)} />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                               required 
                             
                               placeholder="Email" autoComplete="email" onChange={(e)=>setEmail(e.target.value)} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                    
                     required
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput
                 
                      type="date"
                       required
                      onChange={(e)=>setBirthday(e.target.value)}

                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      required
                      placeholder='Adress'
                   
                      onChange={(e)=>setAdress(e.target.value)}

                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">

                    <CFormSelect aria-label="Default select example"  
                        required
                       
                        value={gender}
                        onChange={e =>setGender(e.currentTarget.value)}>
                        
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                  
                    </CFormSelect>
                   </CInputGroup>
                   <CInputGroup className="mb-4">
                
                      <CFormLabel htmlFor="formFile">Picture</CFormLabel>
                     <CFormInput type="file"   id="formFile" onChange={(e)=>setAvatar(e.target.files[0])} />

                  </CInputGroup>
                  <div className="d-grid">
                {wait ? <CSpinner/> :  <CButton color="success" type='submit' >Create Account</CButton>}  
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

export default Register
