import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PatientProfile from "../Components/PatientProfile";
import DoctorData from "../Components/DoctorData";
import toast, { Toaster } from "react-hot-toast";

const PatientDashBoard = () => {
  const email = localStorage.getItem("userEmail");
  const jwtToken = localStorage.getItem("jwtToken");
  const navigator = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      toast.error("Access denied. Please login first!");
      navigator("/patient-login");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toaster />
      <div className="flex relative ">
        {/*Map */}
        <div className="flex flex-col">
          <div className="pt-24 m-auto pb-16">
            <select
              id="countries"
              className="block min-w-96 rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            >
              <option selected>Choose a location</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Kharagpur">Kharagpur</option>
            </select>
          </div>
          <DoctorData email={email} />
        </div>
        <div className="hidden md:block fixed right-0 top-16">
          <PatientProfile />
        </div>
      </div>
    </>
  );
};

export default PatientDashBoard;
