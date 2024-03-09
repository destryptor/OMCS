import React from 'react';
import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

function UpdateProfile({ isDoctor }) {
	const [doctor, setDoctor] = useState({});
	const [patient, setPatient] = useState({});

	const email = 's@g.c';

	useEffect(() => {
		async function fetchData() {
			if (isDoctor) {
				const response = await fetch('http://localhost:6969/doctor/getByEmail', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				});
				if (response.status === 404) setDoctor({});
				if (response.status === 500) alert('Internal server error');
				const data = await response.json();
				return setDoctor(data);
			} else {
				const response = await fetch('http://localhost:6969/patient/getByEmail', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				});
				if (response.status === 404) setPatient({});
				if (response.status === 500) alert('Internal server error');
				const data = await response.json();
				return setPatient(data);
			}
		}
		fetchData();
	});

	const handleUpdate = async (event) => {
		event.preventDefault();
		try {
			if (isDoctor) {
				const _id = doctor._id;
				const name = document.getElementById('name').value;
				const email = document.getElementById('email').value;
				const specialisation = document.getElementById('specialisation').value;
				const certification = document.getElementById('certification').value;
				const clinic = document.getElementById('clinic').value;
				const location = document.getElementById('countries').value;

				const updatedDoctor = {
					_id,
					name,
					email,
					specialisation,
					certification,
					clinic,
					location,
				};

				const response = await fetch('http://localhost:6969/doctor/updateDoctor', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedDoctor),
				});

				if (response.status === 500) alert('Internal server error');
				if (response.status === 404) alert('Doctor not found');
				if (response.status === 200) alert('Doctor updated successfully');
				return;
			} else {
				const _id = patient._id;
				const name = document.getElementById('name').value;
				const email = document.getElementById('email').value;
				const age = document.getElementById('age').value;
				const location = document.getElementById('countries').value;

				const updatedPatient = {
					_id,
					name,
					email,
					age,
					location,
				};

				const response = await fetch('http://localhost:6969/patient/updatePatient', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updatedPatient),
				});

				if (response.status === 500) alert('Internal server error');
				if (response.status === 404) alert('Patient not found');
				if (response.status === 200) alert('Patient updated successfully');
				return;
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{isDoctor ? (
				<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<img className='mx-auto h-10 w-auto' src='/logo.png' alt='OMCS' />
						<h2 className='mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Update Your Profile</h2>
					</div>

					<div className='mt-2 sm:mx-auto sm:w-full sm:max-w-sm'>
						<form className='space-y-6'>
							<div>
								<label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
									Name
								</label>
								<div className='mt-1'>
									<input id='name' name='name' type='name' defaultValue={doctor.name} autoComplete='name' required className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6' />
								</div>
							</div>
							<div>
								<label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
									Email address
								</label>
								<div className='mt-1'>
									<input id='email' name='email' type='email' defaultValue={doctor.email} autoComplete='email' required className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6' />
								</div>
							</div>
							<div>
								<label htmlFor='specialisation' className='block text-sm font-medium leading-6 text-gray-900'>
									Specialisation
								</label>
								<div className='mt-1'>
									<input id='specialisation' name='specialisation' type='specialisation' defaultValue={doctor.specialisation} autoComplete='specialisation' required className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6' />
								</div>
							</div>
							<div>
								<label htmlFor='certification' className='block text-sm font-medium leading-6 text-gray-900'>
									Certification
								</label>
								<div className='mt-1'>
									<input id='certification' name='certification' type='certification' autoComplete='certification' defaultValue={doctor.certification} required className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6' />
								</div>
							</div>
							<div>
								<label htmlFor='clinic' className='block text-sm font-medium leading-6 text-gray-900'>
									Clinic Name
								</label>
								<div className='mt-1'>
									<input id='clinic' name='clinic' type='clinic' autoComplete='clinic' defaultValue={doctor.clinic} required className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6' />
								</div>
							</div>

							<div>
								<div className='flex items-center justify-between'>
									<label htmlFor='countries' className='block mb-2 text-sm font-medium text-gray-900'>
										Select Location
									</label>
								</div>
								<div className='mt-1'>
									<select id='countries' className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'>
										{doctor.location === '' ? <option selected>Choose a location</option> : <option selected>{doctor.location}</option>}
										<option value='Jaipur'>Jaipur</option>
										<option value='Delhi'>Delhi</option>
										<option value='Bangalore'>Bangalore</option>
										<option value='Kharagpur'>Kharagpur</option>
									</select>
								</div>
							</div>

							<div>
								<button type='submit' className='flex w-full justify-center  rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600' onClick={handleUpdate}>
									Update Now
								</button>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<img className='mx-auto h-10 w-auto' src='/logo.png' alt='Your Company' />
						<h2 className='mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Update Your Profile</h2>
					</div>

					<div className='mt-2 sm:mx-auto sm:w-full sm:max-w-sm'>
						<form className='space-y-6'>
							<div>
								<label htmlFor='name' className='block text-sm font-medium leading-6 text-gray-900'>
									Name
								</label>
								<div className='mt-1'>
									<input id='name' name='name' defaultValue={patient.name} type='name' autoComplete='name' required className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6' />
								</div>
							</div>
							<div>
								<label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
									Email address
								</label>
								<div className='mt-1'>
									<input id='email' name='email' type='email' defaultValue={patient.email} autoComplete='email' required className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6' />
								</div>
							</div>

							<div>
								<div className='flex items-center justify-between'>
									<label htmlFor='age' className='block text-sm font-medium leading-6 text-gray-900'>
										Age
									</label>
								</div>
								<div className='mt-1'>
									<input id='age' name='age' type='age' defaultValue={patient.age} autoComplete='current-age' required className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6' />
								</div>
							</div>

							<div>
								<div className='flex items-center justify-between'>
									<label htmlFor='countries' className='block mb-2 text-sm font-medium text-gray-900'>
										Select Location
									</label>
								</div>
								<div className='mt-1'>
									<select id='countries' className='block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6'>
										{patient.location === '' ? <option selected>Choose a location</option> : <option selected>{patient.location}</option>}
										<option value='Jaipur'>Jaipur</option>
										<option value='Delhi'>Delhi</option>
										<option value='Bangalore'>Bangalore</option>
										<option value='Kharagpur'>Kharagpur</option>
									</select>
								</div>
							</div>

							<div>
								<button type='submit' className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600' onClick={handleUpdate}>
									Update Now
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default UpdateProfile;
