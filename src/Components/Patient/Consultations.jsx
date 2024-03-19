import React from 'react'
import Booked from './BookedConsultations/BookedAppointments'
// import Pending from './PendingConsultations/PendingAppointments'
import ConsultData from './ConsultData'
export default function Consultations() {
  return (
    <>
    {/* <Pending/> */}
    <ConsultData/>
    <Booked/>
    </>
  )
}
