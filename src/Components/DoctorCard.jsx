import React from 'react';

export default function DoctorCard(props) {
	const renderableWorkingHours = props.workingHours.filter((workingHour) => workingHour.from !== '' && workingHour.to !== '');
	return (
		<>
			<div className='p-5 m-2 w-full border-solid border-2 border-green-600  rounded-lg shadow-md bg-stone-100'>
				<div className='flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
					<div className=''>
						<h4 className='text-lg font-bold text-center md:text-left mx-2'>Dr. {props.name}</h4>
						<div className='flex'>
							<div className='mx-2'>
								<div className='text-md font-bold text-center md:text-left'>
									Specialisation - <span className='text-gray-600 font-semibold text-sm '>{props.specialisation}</span>
								</div>
								<div className='text-md font-bold text-center md:text-left'>
									Clinic - <span className='text-gray-600 font-semibold text-sm'>{props.clinic}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='mx-2'>
					<div className='text-md font-bold text-center md:text-left'>
						Working Hours -
						<span className='text-gray-600 font-semibold text-sm ml-1'>
							{renderableWorkingHours.map((workingHour, index) => (
								<span key={index}>
									{workingHour.day} - {workingHour.from} to {workingHour.to}
									{index !== renderableWorkingHours.length - 1 && ', '}
								</span>
							))}
						</span>
					</div>
					<div className='text-md font-bold text-center md:text-left'>
						Location - <span className='text-gray-600 font-semibold text-sm'>{props.location}</span>
					</div>
				</div>
				<button className='m-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>Book</button>
			</div>
		</>
	);
}
