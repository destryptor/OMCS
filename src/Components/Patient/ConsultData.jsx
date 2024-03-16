import React from 'react';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ConsultCard from './ConsultCard';

function ConsultData() {
	const [Data, setData] = useState([]);
	const [isData, setIsData] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const email = localStorage.getItem('userEmail');

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

	useEffect(() => {
		const fetchPatient = async () => {
			try {
				const response = await fetch('http://localhost:6969/patient/getByEmail', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${jwtToken}`,
					},
					body: JSON.stringify({ email }),
				});
				if (response.status === 404) {
					toast.error('Patient not found');
				}
				if (response.status === 500) {
					toast.error('Internal server error');
				}
				const patient = await response.json();
				let DoctorData = [];
				const doctorsWithSymptoms = await Promise.all(
					patient.doctor.map(async (doctor) => {
						if (doctor.status !== 'consultation') return null;
						const response = await fetch('http://localhost:6969/doctor/getByEmail', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${jwtToken}`,
							},
							body: JSON.stringify({ email: doctor.email }),
						});

						if (response.status === 404) {
							toast.error('Doctor not found');
							return null;
						}

						if (response.status === 500) {
							toast.error('Internal server error');
							return null;
						}

						const doctorData = await response.json();
						return {
							name: doctorData.name,
							specialisation: doctorData.specialisation,
							clinic: doctorData.clinic,
							location: doctorData.location,
							symptoms: doctor.symptoms,
						};
					})
				);

				const filteredDoctorsWithSymptoms = doctorsWithSymptoms.filter((doctor) => doctor !== null);

				DoctorData.push(...filteredDoctorsWithSymptoms);
				setData(DoctorData);
				setIsData(true);
			
			} catch (error) {
				console.error(error);
				toast.error('Internal server error');
			}
		};
		fetchPatient();
		setLoading(false);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jwtToken]);
	return (
		<>
		  <Toaster />
		  {isLoading ? (
			<p>Loading...</p>
		  ) : (
			<div className={`flex flex-wrap max-w-screen-lg m-auto px-5`}>
			  {Data.length	 > 0 ? (
				Data.map((data, index) => (
				  <ConsultCard
					key={index}
					name={data.name}
					specialisation={data.specialisation}
					clinic={data.clinic}
					location={data.location}
					symptoms={data.symptoms}
				  />
				)) 
			  ) : (
				<div className='p-5 m-2 border-solid border-2 border-red-600 rounded-lg shadow-md bg-stone-100 hover:scale-105 transition-all m-auto'>
				  <div className='flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
					<div className=''>
					  <h4 className='text-lg font-bold text-left mx-2 text-red-700'>No Consultations Pending...</h4>
					</div>
				  </div>
				</div>
			  )}
			</div>
		  )}
		</>
	  );
}

export default ConsultData;
