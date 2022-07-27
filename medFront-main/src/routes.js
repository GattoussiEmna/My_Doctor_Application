import React from 'react'
import Labo from './components/Admin/Labo/Labo'
import Specialite from './components/Admin/ManageSpecia/Specialite'
import Doctor from './components/Admin/ManegDoctor/Doctor'
import Appointment from './components/DoctorComponent/Appointment'
import PatientList from './components/DoctorComponent/managePateint.js/PatientList'
import AnalyseDemande from './components/LaboComponent/AnalyseDemande'
import AllPationAppointement from './components/PatientComponent/AllPationAppointement'
import PateintAppointement from './components/PatientComponent/PateintAppointement'
import PateintRecord from './components/PatientComponent/PateintRecord'
import MedicalInformation from './views/pages/register/MedicalInformation'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Home Page Routes
const routes = [
  { path: '/', exact: true, name: 'Home' },
 
 
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
 
  { path: '/doctor', name: 'Doctor', element: Doctor, exact: true },

  { path: '/lab', name: 'Lab', element: Labo, exact: true },
  { path: '/appointment', name: 'Appointment', element: Appointment, exact: true },
  { path: '/Patientappointment', name: 'Patient Appointment', element: PateintAppointement, exact: true },
  { path: '/allPatientappointment', name: 'All Appointment', element: AllPationAppointement, exact: true },
  { path: '/patientDiagnostic', name: 'Medical Record', element: PateintRecord, exact: true },
  { path: '/patientList', name: 'Patient', element: PatientList, exact: true },
  {path: '/analyseDemande', name:'Lab Demande', element:AnalyseDemande, exact:true  },
  {path: '/specialite', name:'Specialite', element:Specialite},

]

export default routes
