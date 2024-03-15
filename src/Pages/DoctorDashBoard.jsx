import React from 'react';
import DoctorProfile from '../Components/Doctor/DoctorProfile';
import PendingData from '../Components/Doctor/PendingData'
const DoctorDashBoard = () => {
	
	return (
		<div>
			<div className='flex relative py-24'>
			<div className="flex flex-col justify-center w-full md:w-[calc(100%-24rem)]">
			<h1 class="m-auto font-bold my-2 text-2xl uppercase">
             
                Pending Consultations
            </h1>
				<PendingData />
			</div>
			<div className='hidden md:block fixed right-0 top-16'>
				<DoctorProfile />
			</div>
			</div>
		</div>
	);
};

export default DoctorDashBoard;
