import React from 'react';
import DoctorProfile from '../Components/DoctorProfile';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const DoctorDashBoard = () => {
	const navigator = useNavigate();

	const email = localStorage.getItem('userEmail');
	const isDoctor = localStorage.getItem('isDoctor');
	function getJwtToken() {
		const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
		for (const cookie of cookies) {
			const [name, value] = cookie.split('=');
			if (name === 'jwtToken') {
				return value;
			}
		}
		return null;
	}

	useEffect(() => {
		const jwtToken = getJwtToken();
		if (!jwtToken) {
			toast.error('Access denied. Please login first!');
			setTimeout(() => {
				return navigator('/doctor-login');
			}, 1500);
		} else if (isDoctor === 'false') {
			toast.error('Access denied. Please login as a doctor!');
			setTimeout(() => {
				return navigator('/doctor-login');
			}, 1500);
		}
	}, []);

	return (
		<div>
			<div className='flex relative'>
				<div className='hidden md:block fixed right-0 top-16'>
					<DoctorProfile />
				</div>
			</div>
		</div>
	);
};

export default DoctorDashBoard;
