import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatientProfile from '../Components/PatientProfile';

const PatientDashBoard = () => {
	return (
		<div>
			<PatientProfile />
		</div>
	);
};

export default PatientDashBoard;
