import React from 'react';

export default function DoctorCard(props) {

	return (
		<>
			{/* <Toaster /> */}
	
			<div className='p-5 m-2 w-full border-solid border-2 border-green-600  rounded-lg shadow-md bg-stone-100 hover:scale-105 transition-all	'>
				<div className='flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
					<div className=''>
						<h4 className='text-lg font-bold text-left mx-2'>{props.name}</h4>
						<div className='flex'>
							<div className='mx-2'>
								<div className='text-md font-bold text-left'>
									Specialisation - <span className='text-gray-600 font-semibold text-sm '>    {props.specialisation}</span>
								</div>
								<div className='text-md font-bold text-center md:text-left'>
									Clinic - <span className='text-gray-600 font-semibold text-sm'>{props.clinic}</span>
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
				<div className='mx-2'>
					<div className='text-md font-bold text-left'>
						Location - <span className='text-gray-600 font-semibold text-sm'>{props.symptoms}</span>
					</div>
				</div>
			</div>
		</>
	);
}
