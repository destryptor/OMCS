import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ isDoctor }) => {
	const [isLogin, setLogin] = useState(true);
	const [message, setMessage] = useState('');

	const handleLogin = async (event) => {
		event.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const loginData = {
			email: email,
			password: password,
		};
		if (isDoctor) {
			try {
				const response = await fetch('http://localhost:6969/doctor/loginDoctor', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginData),
				});
				if (response.status === 404) {
					console.log('Incorrect email/ password');
					setMessage('Incorrect email/ password');
					return;
				} else if (response.status === 500) {
					setMessage('Internal server error');
					return;
				} else {
					setMessage('');
					const data = await response.json();
					console.log(data);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const response = await fetch('http://localhost:6969/patient/loginPatient', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginData),
				});
				if (response.status === 404) {
					setMessage('Incorrect email/ password');
					return;
				} else if (response.status === 500) {
					setMessage('Internal server error');
					return;
				} else {
					setMessage('');
					const data = await response.json();
					console.log(data);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleSignup = async (event) => {
		event.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		if (email === '' || password === '') {
			setMessage('Please fill all the fields');
			return;
		}
		const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
		if (!emailRegex.test(email)) {
			setMessage('Invalid email');
			return;
		}
		if (password.length < 6) {
			setMessage('Password must be at least 6 characters long');
			return;
		}
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
		if (!passwordRegex.test(password)) {
			setMessage('Password must have an upper case letter, a lower case letter, a number and a special character');
			return;
		}

		const signupData = {
			email: email,
			password: password,
		};

		try {
			if (isDoctor) {
				const response = await fetch('http://localhost:6969/doctor/createDoctor', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(signupData),
				});
				if (response.status === 400) {
					setMessage('Email already in use!');
					return;
				} else if (response.status === 500) {
					setMessage('Internal server error');
					return;
				} else {
					setMessage('');
					const data = await response.json();
					console.log(data);
				}
			} else {
				const response = await fetch('http://localhost:6969/patient/createPatient', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(signupData),
				});
				if (response.status === 400) {
					setMessage('Email already in use!');
					return;
				} else if (response.status === 500) {
					setMessage('Internal server error');
					return;
				} else {
					setMessage('');
					const data = await response.json();
					console.log(data);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{isLogin ? (
				<div className='login'>
					<div className='login-container'>
						<h1>Login</h1>
						<form id='loginForm'>
							<input id='email' type='email' placeholder='Email' />
							<input id='password' type='password' placeholder='Password' />
							<button onClick={handleLogin}>Login</button>
						</form>
						<span id='message' style={{ color: 'red' }}>
							{message}
						</span>
						<p>
							Don't have an account? <Link onClick={() => setLogin(false)}>Sign up</Link>
						</p>
					</div>
				</div>
			) : (
				<div className='signup'>
					<div className='signup-container'>
						<h1>Sign Up</h1>
						<form className='signupForm'>
							<input id='email' type='text' placeholder='Email' />
							<input id='password' type='password' placeholder='Password' />
							<button onClick={handleSignup}>Sign Up</button>
						</form>
						<span id='message' style={{ color: 'red' }}>
							{message}
						</span>
						<p>
							Already have an account? <Link onClick={() => setLogin(true)}>Login</Link>
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Login;
