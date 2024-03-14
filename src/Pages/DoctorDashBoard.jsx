import React from 'react';
import DoctorProfile from '../Components/DoctorProfile';

const DoctorDashBoard = () => {
	
	return (
		<div>
			<div className='flex relative'>
			<div className='hidden md:block fixed right-0 top-16'>
				<DoctorProfile />
			</div>
			</div>
		</div>
	);
};

export default DoctorDashBoard;
