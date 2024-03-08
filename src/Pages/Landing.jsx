import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<>
			<h1>Welcome to the OCMS!</h1>
			<Link to='/doctor-login'>Doctor</Link>
			<Link to='/patient-login'>Patient</Link>
		</>
	);
};

export default Landing;
