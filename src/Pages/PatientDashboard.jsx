import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientProfile from '../Components/PatientProfile';
import DoctorData from '../Components/DoctorData';
import toast, { Toaster } from 'react-hot-toast';

const PatientDashBoard = () => {
	const email = localStorage.getItem('userEmail');
	const jwtToken = localStorage.getItem('jwtToken');
	const navigator = useNavigate();

	useEffect(() => {
		if (!jwtToken) {
			toast.error('Access denied. Please login first!');
			navigator('/patient-login');
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Toaster />
			<div className='flex relative'>
				<DoctorData email={email} />
				<PatientProfile />
			</div>
		</>
	);
};

export default PatientDashBoard;
