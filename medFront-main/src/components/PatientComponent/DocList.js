import React,{useState, useEffect} from 'react'
import axios from 'axios';
import {Tooltip, Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography, Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {CRow, CCol, CCard, CCardHeader, CCardBody, CSpinner, CButton, CModal, CModalHeader, CModalBody } from '@coreui/react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import CancelIcon from '@mui/icons-material/Cancel';

import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import moment from 'moment';
import './DocList.css';
import usePagination from '../Pagination/Pagination'

function DocList() {
 // const classes = useStyles();
    const [specialite, setSpecialite]=useState([]);
    const [value, setValue] = React.useState();
    const [specialisation, setSpecialisation] = useState("");
    const [speId,setSpeId]=useState("");
    const [doctor, setDoctor] = useState([]);
    const [visible, setVisible]=useState(false);
    const [date, setDate] = useState(new Date());
    const [cancelIcon, setCancelIcon]=useState(false);
    const [docId, setDocId]= useState("");
    const user = useSelector(state=>state.user);
    const [startDate, setStartDate] = useState(new Date());
    const[time, setTime]=useState([]);
    let [page, setPage] = useState(1);
    const PER_PAGE = 5;
    const [excludedTimes,setExcludedTimes]=useState([])
    const count = Math.ceil(doctor?.length / PER_PAGE);
    const _DATA = usePagination(doctor, PER_PAGE);
    const [isLoading , setIsLoading]=useState(false);
    const handleChange = (e, p) => {
      console.log(p)
      setPage(p);
      _DATA.jump(p);
    };
     // Get Specialisation function
     const getSpecialisation =()=>{
        axios.get('http://localhost:5000/specialite/getSpecialite')
        .then((res)=>(
            //console.log(res.data.data,"spec")
          setSpecialite(res.data)
        )).catch(err=>console.log(err))
    }
    // Get All Doctor List Fuction
    const getDoctor =()=>{
        axios.get(`http://localhost:5000/users/getUserbyrole/Doctor`)
        .then((res)=>{
            console.log(res.data.data, "doc")
            setDoctor(res.data.data)
          }).catch(err=>console.log(err))
    }
   
    useEffect(() => {
      getSpecialisation();
      getDoctor();
    
    //  console.log(time, 'offffffffffffffffffffff');
      },[]);

     const getDoctorAppointemt =(args)=>{
        axios.get(`http://localhost:5000/appointments/getDoctorDateAppointement/${args}`)
        .then((res)=>{
       
         //console.log( "doc appo",res.data) 
          res.data.map((t)=>{
            setTime((time) => ([...time, t.date]));
         } )
         res.data.map((t)=>console.log((t.date)))
          
          //  console.log(time)
        }).catch((err)=>console.log(err))
      }
     
     // Search Doctor 
     const getDoctorBySpecialisaition =()=>{
        console.log(specialisation, "tttttt")
        if(specialisation !== ""){
            axios.post(`http://localhost:5000/users/getDoctorBySpecialisation`,{speId} )
           .then((res)=>{
             //  console.log(res.data)
            setDoctor(res.data.data);
            setCancelIcon(true);
        }).catch(err=>console.log(err))
        }
        
    }
    
  
  const isWeekday = date => {
    var loIsDate = new Date(date);
    const day = loIsDate.getDay(date);
      return day !== 0 && day !== 6;
 
};     
    //handel search cancel
    const handelSearchCancel =()=>{
        setCancelIcon(false);
        setSpecialisation("");
        getDoctor();
    }
   // handel Calander 
   const handelCalander=(args)=>{
      console.log(args, "doc id")
      //setState({ visible: true, args  });
      setVisible(!visible)
     setDocId(args)
     getDoctorAppointemt(args);
   }  
  
   const handelConfirm =()=>{
    setIsLoading(true);
    console.log(moment(date).format() )
   axios.post('http://localhost:5000/appointments/Addappointment', {userId:user.user._id, doctorId:docId,date:moment(date).format(),cancel:false})
    .then((res)=>{
        
     
          alert(res?.data?.message);  
          setVisible(!visible)
          setIsLoading(false)
          console.log(res.data)
    })
    .catch((err)=>console.log(err))


}
  return (
    <>
    <CRow>
        <CCol>
           <CCard>
               <CCardHeader>
                <CRow >
                    <CCol>
                      <div className='docList_filterContainer'>
                        <div>
                        <h4>Filter par </h4>
                        {specialite?.length > 0  ?

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
                       
                         :
                         <CSpinner/>
                         }
                       
                        </div>
                        <div>
                        <IconButton onClick={getDoctorBySpecialisaition}>
                           <SearchIcon/>
                       </IconButton>
                       {cancelIcon?
                                     <IconButton onClick={handelSearchCancel}>
                                       <CancelIcon/>
                                     </IconButton>
                                : null
                       }
                      
                        </div>
                      </div>
                       
                    </CCol>
                   
                </CRow>
             
               </CCardHeader>
               <CCardBody>
                   {  doctor?.length>0 ?
                     _DATA.currentData().map((doc)=>
                     <>
                       <ListItem key={doc._id}
                          secondaryAction={
                            <Tooltip title='Get appointement'>
                              <IconButton onClick={()=>handelCalander(doc._id)}  >
                                 <DateRangeIcon color="primary"/>
                               </IconButton> 
                            </Tooltip>
                        
                          }
                       >
                        <ListItemAvatar>
                        <Avatar src={`http://localhost:5000/users/getPic/${doc._id}`} sx={{ height: '70px', width: '70px' }} />
                           
                        
                        </ListItemAvatar>
                        <ListItemText
                            primary={doc.firstName }
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                   {doc.specialisation.name}
                                </Typography>
                                   {" -"} { doc.bio}
                                </React.Fragment>
                           }
                         />

                        </ListItem>
                        <Divider variant="inset"  />
                        </>
                   )
                    : <CSpinner/>
                 }
             
               </CCardBody>
                  <div style={{padding:'10px'}} >
                  <Pagination
                    count={count}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
               </div>
           </CCard>
        </CCol>
    </CRow>
    {/**Modal  */}
    <CModal visible={visible} onClose={()=>setVisible(false)} >
        {console.log('test', docId)}
            <CModalHeader>
                Get an Appointement
            </CModalHeader>
            <CModalBody>
            <DatePicker
                selected={date}
                
                filterDate={isWeekday}
               
                onChange={(date) => setDate(date)}
                minDate={moment().toDate()}
              
               
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm "
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 45), 16)}
                inline
              
            />
              
              <CButton disabled={isLoading}  size="lg" className='mt-2' onClick={handelConfirm}  >Submit   </CButton>   

            </CModalBody>
      
    </CModal>
    </>
  )
}

export default DocList