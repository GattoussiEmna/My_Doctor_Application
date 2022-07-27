import React from 'react'
import CIcon from '@coreui/icons-react'
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar, cilGroup, cilBeaker, cilCalendar, cilMenu, cilFolder, cilFilter
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    show: 'All'
   
  },
  
  {
    component: CNavItem,
    name: 'Docotors',
    to: '/doctor',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    show: 'Admin'
  },
  {
    component: CNavItem,
    name: 'Specialite',
    to: '/specialite',
    icon:<CIcon icon={cilFolder} customClassName="nav-icon" />,
    show: 'Admin'
  },
  {
    component: CNavItem,
    name: 'Lab',
    to: '/lab',
    icon: <CIcon icon={cilBeaker} customClassName="nav-icon" />,
    show: 'Admin'
  },
  {
    component: CNavItem,
    name: 'Appointement',
    to: '/appointment',
    icon: <CIcon icon={cilBeaker} customClassName="nav-icon" />,
    show: 'Doctor'
  },
  {
    component: CNavItem,
    name: 'Take an Appointement',
    to: '/Patientappointment',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    show: 'Patient'
  },
  {
    component: CNavItem,
    name: 'All Appointement',
    to: '/allPatientappointment',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
    show: 'Patient'
  },
  {
    component: CNavItem,
    name: 'Medical Record',
    to: '/patientDiagnostic',
    icon:<CIcon icon={cilFolder} customClassName="nav-icon" />,
    show: 'Patient'
  },
  {
    component: CNavItem,
    name: 'Patient',
    to: '/patientList',
    icon:<CIcon icon={cilFolder} customClassName="nav-icon" />,
    show: 'Doctor'
  },
 
  {
    component: CNavItem,
    name: 'Lab Demande',
    to: '/analyseDemande',
    icon:<CIcon icon={cilMenu} customClassName="nav-icon" />,
    show: 'Labo'
  },
 
 
  
  
  
  
  
  
]

export default _nav
