import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DoctorProfile from '../Components/DoctorProfile';

const DoctorDashBoard = () => {
	return (
		<div>
			<DoctorProfile />
		</div>
	);
};

export default DoctorDashBoard;
