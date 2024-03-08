import './App.css';
import Login from './Pages/Login';
import UpdateProfile from './Pages/UpdateProfile';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorDashBoard from './Pages/DoctorDashBoard';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/' element={<DoctorDashBoard />}>
					{/* <Route index element={<Home />} />
					<Route path='blogs' element={<Blogs />} />
					<Route path='contact' element={<Contact />} />
					<Route path='*' element={<NoPage />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
