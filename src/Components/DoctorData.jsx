import React from 'react';
import DoctorCard from './DoctorCard';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function DoctorData({ email }) {
	const [patient, setPatient] = useState({});
	const [Data, setData] = useState([]);

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const patientResponse = await authFetch('http://localhost:6969/patient/getByEmail', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				});

				if (patientResponse.status === 404) {
					setData({});
					return;
				}

				if (patientResponse.status === 500) {
					toast.error('Internal server error');
					return;
				}

				const patientData = await patientResponse.json();
				setPatient(patientData);

				const doctorResponse = await authFetch('http://localhost:6969/doctor/getByLocation', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ location: patient.location }),
				});

				if (doctorResponse.status === 404) {
					setData({});
					return;
				}

				if (doctorResponse.status === 500) {
					toast.error('Internal server error');
					return;
				}

				const doctorsData = await doctorResponse.json();
				doctorsData.sort((a, b) => {
					const specArrA = a.specialisation
						.toLowerCase()
						.split(',')
						.map((spec) => spec.trim())
						.sort();
					const specArrB = b.specialisation
						.toLowerCase()
						.split(',')
						.map((spec) => spec.trim())
						.sort();

					const sortedSpecA = specArrA.join(',');
					const sortedSpecB = specArrB.join(',');

					if (sortedSpecA < sortedSpecB) {
						return -1;
					}
					if (sortedSpecA > sortedSpecB) {
						return 1;
					}
					return 0;
				});

				setData(doctorsData);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Toaster />
			<div className='flex flex-wrap flex-col max-w-screen-lg m-auto absolute top-16 left-7'>
				{/*Map */}
				{Data ? Data.map((data, index) => <DoctorCard key={index} name={data.name} specialisation={data.specialisation} clinic={data.clinic} workingHours={data.workingHours} location={data.location} />) : 'No Data To Show'}
			</div>
		</>
	);
}

export default DoctorData;
