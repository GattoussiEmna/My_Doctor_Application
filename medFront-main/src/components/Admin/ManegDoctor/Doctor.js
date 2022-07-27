import { CButton,CBadge, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormSelect, CInputGroup, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CSpinner, CInputGroupText } from '@coreui/react'
import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios';
import '../DoctorTable/Table.css';
import {useTable, useSortBy, useGlobalFilter, useFilters, usePagination} from 'react-table';
import { GlobelFiltering } from '../DoctorTable/GlobelFiltering';
import EditIcon from '@material-ui/icons/Edit';
import ColumnsFilter from "../DoctorTable/ColumnsFilter";
import { Delete } from '@material-ui/icons';
import '../DoctorTable/column.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';




function Doctor() {
  
  const [specialite, setSpecialite]=useState([]);
  const [showAdd, setShowAdd]=useState(false);
  const [data, setData]= useState([]);
  const [gender, setGender]= useState("");
  const [email,setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [firstName, setFirstName]=useState("");
  const [lastName, setLastName]=useState("");
  const [adresse, setAddress]=useState("");
  const role= "Doctor";
  const [education,setEducation]=useState("");
  const [specialisation, setSpecialisation]= useState("");
  const [bio, setBio]=useState("");
  const [disponible,setDisponible]=useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId]=useState("");
  const [file, setFile] = useState(null);
  const [speId,setSpeId]=useState("");
const [isLoading, setIsLoading]= useState(false)
  const getBadge = (status)=>{
   // console.log("status",status);
    switch (status) {
      case true: return 'success'
   
      case false: return 'danger'
      default: return 'primary'
    }
  }
     // Get Specialisation function
     const getSpecialisation =()=>{
      axios.get('http://localhost:5000/specialite/getSpecialite')
      .then((res)=>(
      //    console.log(res.data,"spec")
          setSpecialite(res.data)
      )).catch(err=>console.log(err))
  }
  const columns = React.useMemo(
    () => [
      {
        Header : 'First Name',
        accessor:'firstName',
        Filter : ColumnsFilter
    },
    {
        Header : 'Last Name',
        accessor:'lastName',
        Filter : ColumnsFilter
    },
    {
        Header : 'Email',
        accessor:'email',
        Filter : ColumnsFilter
    },
    {
        Header : 'Gender',
        accessor:'gender',
        Filter : ColumnsFilter
    },
    {
        Header : 'Dispoinble',
        accessor:'disponible',
        Cell: row => (
            <div>
             <CBadge color={getBadge(row.row.original.disponible)}>
                {row.row.original.disponible ==true? <span>Dispo</span>  :  <span>not dispo</span> }
              </CBadge>
               
            </div>
            ),
        Filter : ColumnsFilter
    },

    {   
      id : 'action',
      Header: 'Action',
      disableGlobalFilter :true,
          Cell: row => (
          <div className='column_containerrow' >
             <button  onClick={e=> handleEdit(row.row.original)}>
                 <EditIcon className='edit'/>
             </button>
             <button onClick={e=> handleDelete(row.row.original)}>
                 <Delete color='red' className='delete' />
             </button>
          </div>
          ),
  }
      
    ],
    []
  )
  const handleEdit = (e) => {
    console.log(e);
    setId(e._id);
    setEmail(e.email);
    setFirstName(e.firstName);
    setLastName(e.lastName);
    setAddress(e.adresse);
    setEducation(e.education);
    setSpecialisation(e.specialisation.name)
    setBio(e.bio);
    setDisponible(e.disponible)
    setShowEdit(true)
   }
   const handleDelete = (e) => {
    console.log(e._id);
     const id = e._id
      axios.delete(`http://localhost:5000/users/deleteUserbyid/${id}`)
      .then((res)=>alert(res.data.message)).catch((err)=>console.log(err))
    
   }
    
 
  // Get Doctors from Database
  const GetDoctor =()=>{
    axios.get('http://localhost:5000/users/getUserbyrole/Doctor')
    .then((res)=>{
     setData(res.data.data);
     console.log(res.data.data)
    }).catch((err)=>console.log(err))
  } 
  useEffect(()=>{
     GetDoctor();
     getSpecialisation();
  },[]);

  const handelShow = () =>{
    setShowAdd(!showAdd)
 
  }  
  const handeCloseEdit =()=>{
    setEmail("")
    setFirstName("");
    setLastName("");
    setAddress("");
    setEducation("");
    setSpecialisation("")
    setBio("");
    setShowEdit(false);
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    gotoPage,
    state,
    pageOptions,
    pageCount,
    setGlobalFilter,
    
    
  } = useTable({columns,data},useFilters, useGlobalFilter,usePagination ) ;
  
  const {globalFilter , pageIndex}=state    
       
    // handel file
    function onChange (e){
      setFile(e.target.files[0]);
    
    } 
  // Handel Submit
  const submit =(e)=>{
   e.preventDefault();
   setIsLoading(true)
   const formData = new FormData();
     formData.append('file', file);
     formData.append('firstName', firstName);
     formData.append('lastName', lastName);
     formData.append('email', email);
     formData.append('password', password);
     formData.append('adresse', adresse);
     formData.append('gender', gender);
     formData.append('role', role);
     formData.append('education', education);
     formData.append('specialisation', speId);
     formData.append('bio', bio);
     formData.append('disponible', disponible);
   
   axios.post("http://localhost:5000/users/register",formData, 
    
    {
    Headers:{
        'content-type': 'application/json'
      }})
   .then((res)=>{
      if(res.status==200) {
        alert("doctor addedd");
        window.location.reload();
        /*setId("");
        setEmail("")
        setFirstName("");
        setLastName("");
        setAddress("");
        setEducation("");
        setSpecialisation("")
        setBio("");
        setDisponible("") 
        setShowAdd(false);*/
      }
      else alert(" failed adding a new doctor, somthing went wrong ")
   }
     
   )
   .catch((err)=>console.log(err))
  }
 // EDit DOCTIR
 const handelEditDoc =()=>{
  axios.put(`http://localhost:5000/users/updateDoc/${id}`,{firstName,lastName,email,gender,specialisation,disponible,adresse,bio,education})
        .then((res)=>alert(res.data.message)).catch((err)=>console.log(err)) 
}

  return (
    <>
      <CRow>
        <CCol>
          <CCardHeader>
             <CButton onClick={handelShow}>Add Doctor</CButton>  
         
          </CCardHeader>
          
        </CCol>
        </CRow>
        <CRow>
        <CCol>
          <CCardBody>

          <GlobelFiltering  filter={globalFilter} setFilter={setGlobalFilter} />
          {data?.length >0 ? 
                             <div style={{overflowX:'auto'}} >
                               <table {...getTableProps()}  className='Filtredtable'>
                                <thead>
                                {headerGroups.map((headerGroup, index) =>(
                                    <tr {...headerGroup.getHeaderGroupProps()} key={index} >
                                     {headerGroup.headers.map((column)=>(
                                         <th {...column.getHeaderProps()} key={index} > 
                                        
                                            {column.render('Header')}
                                          
                                          
                                            
                                          </th>
                                     ))}
                                    
                                </tr>  
                                ))}
                                 {headerGroups.map((headerGroup, index) =>(
                                    <tr {...headerGroup.getHeaderGroupProps()} key={index} >
                                     {headerGroup.headers.map((column, index)=>(
                                         <th {...column.getHeaderProps()} className='columnFilter' key={index} > 
                                       
                                          
                                            {column.canFilter? column.render('Filter'): null}
                                          </th>
                                     ))}
                                    
                                </tr>  
                                ))}
                              
                            </thead> 
                            <tbody {...getTableBodyProps()}>
                           {page.map(row => {
                             prepareRow(row)
                             return (
                               <tr {...row.getRowProps()} key={row.id} {...console.log(row)} className='tbody'>
                                 {row.cells.map(cell => {
                                   return (

                                      <td {...cell.getCellProps()} key={cell.row.original._id} >
                                     
                                     {cell.render('Cell')}
                                   </td>
                                   )
                                  
                                 })}
                               </tr>
                             )
                           })}
                         </tbody>
                            </table>
                             </div>
                          
                           : <CSpinner></CSpinner>
          }
    
        <div className='table__pagination'>
          <span>
              Page {' '}
              {pageIndex +1}
              of  {' '} { pageOptions.length}
            
            
            </span>
          <ul className='pagination__list'>
              
            <li >
              <a href='#' onClick={()=>gotoPage(0)} className={`${!canPreviousPage?'disableLink' : null }`} > 
              {'<<'}</a>   
            </li>
            <li >
              <a href='#'onClick={()=>previousPage()} 
                 className={`${!canPreviousPage?'disableLink' : null }`}>{'<'}</a>  
            </li>
          
            {pageOptions.map((number)=>(
                <li key={number} onClick={()=>pageIndex === number? console.log('egal') : console.log(' notegal')  }>
                  <a href='#'onClick={()=>gotoPage(number)}  className={`${pageIndex === number?'activeLink' : null }`} >
                    {number + 1}
                  </a>
                  
                </li>
              ))} 
            
            
            <li >
              <a href='#'onClick={()=>nextPage()} 
              className={`${!canNextPage?'disableLink' : null }`}
              >{'>'} </a> 
            </li>
            <li >
              <a href='#'onClick={()=>gotoPage(pageCount - 1) } className={`${!canNextPage?'disableLink' : null }`}
            >{'>>'}</a> 
            </li>
            </ul>
        </div>
          </CCardBody>
        </CCol>
        </CRow>
      
      


       {/** ADD Doctor Modal */}
      <CModal visible={showAdd} onClose={handelShow}  alignment="center">
       <CModalHeader>
         <CModalTitle>Add a new Doctor</CModalTitle>
       </CModalHeader>
       <CModalBody>
         <CForm>
         <CInputGroup className="mb-3">
                      <CFormInput placeholder="First Name" autoComplete="First Name" 
                           value={firstName}
                           onChange={(e)=>setFirstName(e.target.value)}    
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Last Name" autoComplete="Last Name" 
                             value={lastName}
                             onChange={(e)=>setLastName(e.target.value)}
                      />
          </CInputGroup>
         <CInputGroup className="mb-3">
                      <CFormInput  placeholder="Email"  
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}    
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Password" autoComplete="password"    type="password"
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}     
                      />
          </CInputGroup>
       
          <CInputGroup className="mb-3">
          <CFormInput type="file" id="inputGroupFile02"  onChange={(e) => onChange(e)}/>
          <CInputGroupText component="label" htmlFor="inputGroupFile02">Upload</CInputGroupText>
          </CInputGroup>
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Address" autoComplete="address" 
                             value={adresse}
                             onChange={(e)=>setAddress(e.target.value)}
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
             <CFormSelect aria-label="Default select example"  
                 value={gender}
                 onChange={e =>setGender(e.currentTarget.value)}>
                <option>Gender</option>
                 <option value="Male">Male</option>
                  <option value="Female">Female</option>
           
          </CFormSelect>

          </CInputGroup>
          
          
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Education" autoComplete="education" 
                             value={education}
                             onChange={(e)=>setEducation(e.target.value)}
                      />
          </CInputGroup>
          <CInputGroup>
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
          </CInputGroup>
       
      
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Bio" autoComplete="bio" 
                             value={bio}
                             onChange={(e)=>setBio(e.target.value)}
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
             <CFormSelect aria-label="Default select example" 
              value={disponible}
              onChange={e =>setDisponible(e.currentTarget.value)}> 
           
            <option>Disponible</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
           
          </CFormSelect>

          </CInputGroup>

        
         </CForm>
       </CModalBody>
       <CModalFooter>
           <CButton  onClick={submit} htmlType="submit" disabled={isLoading} >Submit </CButton>
        
       </CModalFooter>
      </CModal>

    {/** Edit Modal */}
     <CModal  visible={showEdit} onClose={handeCloseEdit} >
        <CModalHeader>
            <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
       <CModalBody>
         <CForm>
          
         <CInputGroup className="mb-3">
                      <CFormInput placeholder="First Name" autoComplete="First Name" 
                           value={email}
                           onChange={(e)=>setEmail(e.target.value)}    
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="First Name" autoComplete="First Name" 
                           value={firstName}
                           onChange={(e)=>setFirstName(e.target.value)}    
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Last Name" autoComplete="Last Name" 
                             value={lastName}
                             onChange={(e)=>setLastName(e.target.value)}
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Address" autoComplete="address" 
                             value={adresse}
                             onChange={(e)=>setAddress(e.target.value)}
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
             <CFormSelect aria-label="Default select example"  
                 value={gender}
                 onChange={e =>setGender(e.currentTarget.value)}>
                <option>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
           
          </CFormSelect>

          </CInputGroup>
          
          
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Education" autoComplete="education" 
                             value={education}
                             onChange={(e)=>setEducation(e.target.value)}
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Specialisation" autoComplete="specialisation" 
                             value={specialisation}
                             onChange={(e)=>setSpecialisation(e.target.value)}
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
                      <CFormInput placeholder="Bio" autoComplete="bio" 
                             value={bio}
                             onChange={(e)=>setBio(e.target.value)}
                      />
          </CInputGroup>
          <CInputGroup className="mb-3">
             <CFormSelect aria-label="Default select example" 
                          value={disponible}
                         onChange={e =>setDisponible(e.currentTarget.value)}> 
           
                <option>Disponible</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
           
          </CFormSelect>

          </CInputGroup>

        
         </CForm>
      </CModalBody>
      <CModalFooter>
      
        <CButton color="primary" onClick={handelEditDoc}>Edit </CButton>
   
      </CModalFooter>
    </CModal>
    
   
    </>
  )
}

export default Doctor