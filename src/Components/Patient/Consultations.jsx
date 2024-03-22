import React from 'react';
import Booked from './BookedConsultations/BookedAppointments';
import PendingConsulations from './PendingConsultations/PendingConsultations';
// import ConsultData from './ConsultData';
export default function Consultations() {
	return (
		<>
			<PendingConsulations />
			<h2 className='m-auto pt-12 font-bold my-2 text-xl uppercase'>Booked Appointments</h2>
			<Booked />
		</>
	);
}
