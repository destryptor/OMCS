import React from 'react';
import DoctorCard from './DoctorCard';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function DoctorData({ location }) {
	const [Data, setData] = useState([]);
	const [isData, setIsData] = useState(false);
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
				const doctorResponse = await authFetch('http://localhost:6969/doctor/getByLocation', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ location }),
				});

				if (doctorResponse.status === 404) {
					setData({});
					setIsData(false);
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
				setIsData(true);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [location]);
	return (
		<>
			<Toaster />

			<div className={`flex flex-wrap max-w-screen-lg m-auto   px-5`}>
				{isData ? (
					Data.map((data, index) => <DoctorCard key={index} name={data.name} specialisation={data.specialisation} clinic={data.clinic} workingHours={data.workingHours} location={data.location} email={data.email} doctor_id={data._id} />)
				) : (
					<div className='p-5 m-2 border-solid border-2 border-red-600  rounded-lg shadow-md bg-stone-100 hover:scale-105 transition-all m-auto'>
						<div className='flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
							<div className=''>
								<h4 className='text-lg font-bold text-left mx-2 text-red-700'>No Doctor Available</h4>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default DoctorData;
