import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [isLogin, setLogin] = useState(true);
	const [isDoctor, setDoctor] = useState(true);
	const [message, setMessage] = useState('');

	const handleLogin = async () => {
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		const loginData = {
			email: email,
			password: password,
		};
		if (isDoctor) {
			try {
				const response = await fetch('http://localhost:3000/loginDoctor', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginData),
				});
				if (response.status === 404) {
					console.log('Incorrect email/ password');
					setMessage('Incorrect email/ password');
				} else {
					const data = await response.json();
					console.log(data);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const response = await fetch('http://localhost:3000/loginPatient', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: loginData,
				});
				if (response.status === 404) {
					console.log('Incorrect email/ password');
				} else {
					const data = await response.json();
					console.log(data);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<>
			{isLogin ? (
				<div className='login'>
					<div className='login-container'>
						<h1>Login</h1>
						<input id='email' type='email' placeholder='Email' />
						<input id='password' type='password' placeholder='Password' />
						<button onClick={handleLogin}>Login</button>
						<p>
							Don't have an account? <Link onClick={() => setLogin(false)}>Sign up</Link>
						</p>
						<span id='message' style={{ color: 'red' }}>
							{message}
						</span>
					</div>
				</div>
			) : (
				<div className='signup'>
					<div className='signup-container'>
						<h1>Sign Up</h1>
						<input type='text' placeholder='Name' />
						<input type='text' placeholder='Email' />
						<input type='password' placeholder='Password' />
						<input type='number' placeholder='Age' />
						<input type='text' placeholder='Location' />
						<input type='text' placeholder='Symptoms' />
						{isDoctor ? <input type='text' placeholder='Specialization' /> : ''}
						<button>Sign Up</button>
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
