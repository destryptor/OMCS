import React, { useState } from 'react';

export default function PendingCard(props) {
	return (
		<>
			<div className='p-5 m-2 w-full border-solid border-2 border-green-600  rounded-lg shadow-md bg-stone-100 hover:scale-105 transition-all 	'>
				<div className='flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
					<div className=''>
						<h4 className='text-lg font-bold text-left mx-2'>{props.name}</h4>
						<div className='flex'>
							<div className='mx-2'>
								<div className='text-md font-bold text-center md:text-left'>
									Age - <span className='text-gray-600 font-semibold text-sm'>{props.age}</span>
								</div>
								<div className='text-md font-bold text-left'>
									Symptoms - <span className='text-gray-600 font-semibold text-sm '>{props.symptoms}</span>
								</div>
								<div className='text-md font-bold text-left'>
									Status - <span className='text-gray-600 font-semibold text-sm '>{props.status}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='mx-2'>
					<div className='text-md font-bold text-left'>
						Location - <span className='text-gray-600 font-semibold text-sm'>{props.location}</span>
					</div>
				</div>
				<div className='flex'>
					<button className='m-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>Online Prescriptioni</button>
					<button className='m-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>Book Appointment</button>
				</div>
			</div>
		</>
	);
}
