import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useSelector } from 'react-redux'
import PatinetDashbord from './PatinetDashbord'
import DoctorDashbord from './DoctorDashbord'
import LaboDashbord from './LaboDashbord';
import AdminDashbord from './AdminDashbord'

const Dashboard = () => {
   const select = useSelector(state=>state.user)
   const role = select.user.role;
  

  return (
    <>
    {(() => {
        if (role ==="Patient") {
          return (
            <PatinetDashbord/>
          )
        } else if (role ==="Admin") {
          return (
            <AdminDashbord/>
          )
        } else if(role==="Doctor"){
          return (
            <DoctorDashbord/>
          )
        }
        else if(role==="Labo"){
          return (
         <LaboDashbord/>
          )
        }
      })()}
     
    </>
  )
}

export default Dashboard
