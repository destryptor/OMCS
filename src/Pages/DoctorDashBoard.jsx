import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoctorProfile from "../Components/DoctorProfile";
import DoctorData from "../Components/DoctorData.jsx";

const DoctorDashBoard = () => {
  return (
    <div>
      <DoctorData />
      <DoctorProfile />
    </div>
  );
};

export default DoctorDashBoard;
