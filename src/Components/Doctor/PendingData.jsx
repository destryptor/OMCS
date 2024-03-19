import React from 'react';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PendingCard from './PendingCard';
function PendingData({ status }) {
	const [Data, setData] = useState([]);
	const [isData, setIsData] = useState(false);
	const [isLoading, setLoading] = useState(true);

	const doctorEmail = localStorage.getItem('userEmail');
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

	const jwtToken = getJwtToken();

	const authFetch = async (url, options = {}) => {
		const token = getJwtToken();

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
				const doctorResponse = await fetch('http://localhost:6969/doctor/getByEmail', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${jwtToken}`,
					},
					body: JSON.stringify({ email: doctorEmail }),
				});

				if (doctorResponse.status === 500) {
					return toast.error('Internal server error');
				}

				const doctor = await doctorResponse.json();
				const patients = doctor.patients;
				patients.map(async (patient) => {
					if (patient.status === 'consultation') {
						const patientResponse = await fetch('http://localhost:6969/patient/getByEmail', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${jwtToken}`,
							},
							body: JSON.stringify({ email: patient.email }),
						});
						if (patientResponse.status === 500) {
							return toast.error('Internal server error');
						}
						const patientData = await patientResponse.json();
						const tempData = {
							name: patientData.name,
							age: patientData.age,
							symptoms: patient.symptoms,
							location: patientData.location,
						};
						setData((prevData) => [...prevData, tempData]);
						setIsData(true);
					}
				});
				console.log(Data);
			} catch (e) {
				console.log(e);
			}
		};
		fetchData();
		setLoading(false);
	}, []);
	return (
		<>
			<Toaster />
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className={`flex flex-wrap max-w-screen-lg mx-auto px-5 w-full`}>
					{isData ? (
						Data.map((data, index) => <PendingCard key={index} name={data.name} age={data.age} symptoms={data.symptoms} location={data.location} status={status} />)
					) : (
						<div className='p-5 m-2 border-solid border-2 border-red-600 rounded-lg shadow-md bg-stone-100 hover:scale-105 transition-all m-auto'>
							<div className='flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
								<div className=''>
									<h4 className='text-lg font-bold text-left mx-2 text-red-700'>No Pending Consultations</h4>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default PendingData;
