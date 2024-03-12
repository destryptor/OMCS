import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DoctorProfile from '../Components/DoctorProfile';
import DoctorCard from '../Components/DoctorCard';

const DoctorDashBoard = () => {
	return (
		<div>
						<DoctorCard/>

			<DoctorProfile />
		</div>
	);
};

export default DoctorDashBoard;
