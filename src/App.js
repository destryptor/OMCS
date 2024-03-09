import "./App.css";
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import UpdateProfile from "./Pages/UpdateProfile";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorDashBoard from "./Pages/DoctorDashBoard";

function App() {
  return (
    <>
     
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/doctor-login" element={<Login isDoctor={true} />} />
          <Route path="/patient-login" element={<Login isDoctor={false} />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
