import React from 'react';
import DoctorCard from './DoctorCard';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function DoctorData({ location }) {
	const [Data, setData] = useState([]);

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
				const doctorResponse = await authFetch('http://localhost:6969/doctor/getByLocation', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ location }),
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
	}, [location]);
	return (
		<>
			<Toaster />

			<div className={`flex flex-wrap max-w-screen-lg m-auto   px-5 w-full`}>
				{Data.length>0 ? (
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
