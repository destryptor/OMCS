import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientProfile from '../Components/Patient/PatientProfile';
import DoctorData from '../Components/Patient/DoctorData';
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import ConsultData from '../Components//Patient/ConsultData';

const PatientDashBoard = () => {
	const [location, setLocation] = useState('');
	const [isLoading, setIsLoading] = useState(true);

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

	const navigator = useNavigate();
	const authFetch = async (url, options = {}) => {
		const jwtToken = getJwtToken();
		const headers = {
			'Content-Type': 'application/json',
		};

		if (jwtToken) {
			headers['Authorization'] = `Bearer ${jwtToken}`;
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
		const jwtToken = getJwtToken();
		if (!jwtToken) {
			toast.error('Access denied. Please login first!');
			setTimeout(() => {
				return navigator('/patient-login');
			}, 1500);
		} else if (isDoctor === 'true') {
			toast.error('Access denied. Please login as a patient!');
			setTimeout(() => {
				return navigator('/patient-login');
			}, 1500);
		} else {
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
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Toaster />
			{isLoading ? ( // Render loading state
				<div class='m-auto font-bold text-96'>Loading...</div>
			) : (
				<div className='flex relative'>
					{/*Map */}
					<div className='flex flex-col justify-center w-full md:w-[calc(100%-24rem)]'>
						<div className='pt-24 m-auto pb-1 border-red-600 flex justify-around items-center md:w-[calc(100%-24rem)]'>
							{window.location.pathname !== '/patient-dashboard/pending' && (
								<select id='countries' className='block m-2 md:min-w-48 rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 h-8' onChange={handleLocationChange}>
									<option selected>Choose a location</option>
									<option value='Jaipur'>Jaipur</option>
									<option value='Delhi'>Delhi</option>
									<option value='Bangalore'>Bangalore</option>
									<option value='Kharagpur'>Kharagpur</option>
								</select>
							)}
							{window.location.pathname === '/patient-dashboard/pending' ? (
								<Link to='/patient-dashboard' className='m-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
									All Doctors - Here
								</Link>
							) : (
								<Link to='/patient-dashboard/pending' className='m-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
									Pending Consultations - Here
								</Link>
							)}
						</div>
						{/* Needs styling... */}
						<h2 class='m-auto font-bold my-2 text-xl uppercase'>{window.location.pathname === '/patient-dashboard/pending' ? 'Pending Consultations' : 'List of available doctors'}</h2>

						<Routes>
							<Route path='/' element={<DoctorData location={location} />} />
							<Route path='/pending' element={<ConsultData />} />
							<Route path='/patient-dashboard' element={<Outlet />} />
						</Routes>
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
