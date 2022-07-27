import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux"
import { useNavigate  ,useLocation } from "react-router-dom";


const Login = () => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const dispatch =useDispatch();
  const location = useLocation(); 
  const [showSignUp,setShowSignUp ]= useState(false)
  let navigate  = useNavigate  ();
  const [showAlert, setShowAlert]= useState(false);
  useEffect(()=>{
     
     console.log(location.state)
     setShowSignUp(location?.state?.reservation);
   },[showSignUp])
 
   // LogIn function
    const login =(e)=>{
      e.preventDefault();
        axios.post("http://localhost:5000/users/login",{email,password})
        .then((res)=>{
          console.log(res.data);
         // alert(res.data.msg)
          dispatch({
            type: 'setUser',
            user : res.data
          })
          dispatch({
            type: 'onLogin',
            isLogIn : true
          })
       
          console.log("res", res)
          if(showSignUp == true){
            console.log("true")
            navigate("/Patientappointment");
          }
          else {
            console.log("true")
                navigate("/");

          }
        })
        .catch((err)=>{
          if(err.response.status){
            setShowAlert(true);
          }
         console.log(err)
        }) 
    }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    {showAlert ?
                                 <CAlert color="danger">
                                 Wrong Email or Password, Try Again
                                 </CAlert>
                                :
                                null
                    } 
                  
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" 
                                  onChange={(e)=>setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e)=>setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={login}>
                          Login
                        </CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
               {showSignUp ? null :
                  <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Sign up to make appointment and consult your medical record any where and any time
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
               }
           
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
