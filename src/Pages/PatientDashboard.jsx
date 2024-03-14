import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientProfile from '../Components/PatientProfile';
import DoctorData from '../Components/DoctorData';
import toast, { Toaster } from 'react-hot-toast';

const PatientDashBoard = () => {
	const [location, setLocation] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const email = localStorage.getItem('userEmail');
	const jwtToken = localStorage.getItem('jwtToken');
	const navigator = useNavigate();
	const authFetch = async (url, options = {}) => {
		const token = localStorage.getItem('jwtToken');

		const headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		if (options.headers) {
			Object.assign(headers, options.headers);
		}

		return await fetch(url, {
			...options,
			headers: headers,
		});
	};

	const handleLocationChange = async (event) => {
		const changedlocation = event.target.value;
		setLocation(changedlocation);
	};

	useEffect(() => {
		if (!jwtToken) {
			toast.error('Access denied. Please login first!');
			navigator('/patient-login');
		}
		const fetchData = async () => {
			const response = await authFetch('http://localhost:6969/patient/getByEmail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			if (response.status === 404) {
				toast.error('Patient not found');
				return;
			}

			if (response.status === 500) {
				toast.error('Internal server error');
				return;
			}

			const patientData = await response.json();
			if (!patientData.location) {
				toast.error('Please update your location');
				return;
			}
			setLocation(patientData.location);
			setIsLoading(false); // Set loading to false after location is set
		};
		fetchData();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Toaster />
			{isLoading ? ( // Render loading state
				<div>Loading...</div>
			) : (
				<div className='flex relative'>
					{/*Map */}
					<div className='flex flex-col justify-center md:w-[calc(100%-24rem)]'>
						<div className='pt-24 m-auto pb-16'>
							<select id='countries' className='block min-w-96 rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6' onChange={handleLocationChange}>
								<option selected>Choose a location</option>
								<option value='Jaipur'>Jaipur</option>
								<option value='Delhi'>Delhi</option>
								<option value='Bangalore'>Bangalore</option>
								<option value='Kharagpur'>Kharagpur</option>
							</select>
						</div>
						{/* Needs styling... */}
						<h2>List of available doctors</h2>
						<DoctorData location={location} />
					</div>
					<div className='hidden md:block fixed right-0 top-16'>
						<PatientProfile />
					</div>
				</div>
			)}
		</>
	);
};

export default PatientDashBoard;
