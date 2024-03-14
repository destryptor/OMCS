import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';

const Navbar = () => {
	const navigator = useNavigate();
	const jwtToken = localStorage.getItem('jwtToken');
	const handleSignout = () => {
		localStorage.removeItem('jwtToken');
		localStorage.removeItem('userEmail');
		navigator('/');
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}

	return (
		<>
			<Disclosure as='nav' className='bg-green-800 fixed w-screen z-50 top-0'>
				<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
					<div className='relative flex h-16 text-center justify-center '>
						<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
							<div className='flex flex-shrink-0 items-center'>
								<div className='flex justify-center items-center'>
									<img className='h-8 w-auto' src='./logo.png' alt='Your Company' />
									<h1 className='m-2 text-white text-lg font-bold'>OMCS</h1>
								</div>
							</div>
							{/* Header to show hello user in center*/}
						</div>
						<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
							<Menu as='div' className='relative ml-3'>
								<div>
									<Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
										<span className='absolute -inset-1.5' />
										<span className='sr-only'>Open user menu</span>
										<img className='h-8 w-8 rounded-full' src='./profile.png' alt='' />
									</Menu.Button>
								</div>
								<Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
									<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none px-2'>
										{jwtToken ? (
											<Menu.Item>
												{({ active }) => (
													<button className={classNames(active ? 'bg-gray-100 m-auto w-full rounded' : '', 'block px-4 py-2 text-sm text-gray-700 m-auto w-full rounded')} onClick={handleSignout}>
														Sign out
													</button>
												)}
											</Menu.Item>
										) : (
											<Menu.Item>
												{({ active }) => (
													<>
														<Link to='/doctor-login' className={classNames(active ? 'bg-gray-100 m-auto w-full rounded' : '', 'block py-2 text-sm text-gray-700 m-auto w-full rounded')}>
															Doctor Login
														</Link>
														<Link to='/patient-login' className={classNames(active ? 'bg-gray-100 m-auto w-full rounded' : '', 'block  py-2 text-sm text-gray-700 m-auto w-full rounded')}>
															Patient Login
														</Link>
													</>
												)}
											</Menu.Item>
										)}
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			</Disclosure>
		</>
	);
};

export default Navbar;
