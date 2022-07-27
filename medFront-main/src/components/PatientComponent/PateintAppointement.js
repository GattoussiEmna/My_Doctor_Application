import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  { DtCalendar } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'
import './patientAppointement.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from 'moment';
import axios from 'axios';
import DocList from './DocList';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

function PateintAppointement() {
    const doc = useSelector(state=>state.doctor);
    const d = [{doc}];
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const [show, setShow]=useState(false);
    const [date, setDate] = useState(null);
    const [continu, setContinu]= useState(false);
    const [disabledDate, setDisabledDates] = useState([]);
 
  console.log("doc", doc.firstName)
    
    useEffect(()=>{
   
        if(Object.keys(doc).length != 0){
             setShow(!show);
        }
    
    },[])
    const handelModalClose=()=>{
        dispatch({type:'setDoctor', doctor:[]});
        setShow(!setShow)
    }
    const handelYes = ()=>{
          setContinu(true);
          setShow(!show);
    }
    const isWeekday = date => {
        var loIsDate = new Date(date);
        const day = loIsDate.getDay(date);
        return day !== 0 && day !== 6;
    };   
    const handelConfirm =()=>{
        console.log(moment(date).format() )
        axios.post('http://localhost:5000/appointments/Addappointment', {userId:user.user._id, doctorId:doc._id,date:moment(date).format()})
        .then((res)=>{
            alert(res.data.message)
            setContinu(false)
              dispatch({
                  type:'setDoctor',
                  doctor :[]
              })
         
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
     ///   var dayOfWeek = moment(date).format();
        //var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0); // 6 = Saturday, 0 = Sunda
        //console.log( moment(dayOfWeek).format('D'), isWeekend)
     
       //console.log(moment(date).format("YYYY-MM-DD").day());

    }
  return (
    <>
   
    {
        doc?.length >0 ?
                   null
                     :
                     <CModal visible={show}  onClose={()=>setShow(false)}   backdrop={'static'}>
                    
                     <CModalBody>
                         Do you want to continu geting appointeme with Docotor {doc.firstName}
                     </CModalBody>
                     <CModalFooter>
                         <CButton onClick={handelYes}>Yes</CButton>
                         <CButton color='danger' onClick={handelModalClose} >No</CButton>
                     </CModalFooter>
                  </CModal>
    }
    {
       continu ?
 
          <div >
            <div className='doc_container'>
              
                          {console.log("ddd", doc.firstName)}
                   <div> <img  src={`http://localhost:5000/users/getPic/${doc._id}`} className='doc_img'  /> </div>
                <div className='doc_info'>
                   <h1 className='doc_name'>Dr  {doc?.firstName} {" "} {doc?.lastName} </h1>
                   <div className='doc_spe'>
                      {doc?.specialisation.name}
                    </div>
                      <div className='doc_add'> 
                         <LocationOnIcon/>  {doc?.adresse}
                    
                   </div> 
                  
                 
                </div> 
               
            </div>
            <div>
            <DatePicker
                selected={date}
                filterDate={isWeekday}
                onChange={(date) => setDate(date)}
                minDate={moment().toDate()}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minTime={setHours(setMinutes(new Date(), 0), 8)}
                maxTime={setHours(setMinutes(new Date(), 45), 16)}
                inline
            />
           <CButton disabled={!date}  size="lg" className='mt-2' onClick={handelConfirm} >Confirm</CButton>   
            </div>
         
        </div>
    
        
  
     
                          
                    :
             <DocList/>
    }
  
    </>
  )
}

export default PateintAppointement