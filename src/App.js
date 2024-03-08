import './App.css';
import Login from './Pages/Login';
import UpdateProfile from './Pages/UpdateProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<UpdateProfile />}>
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
