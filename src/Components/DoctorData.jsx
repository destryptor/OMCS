import React from "react";
import DoctorCard from "./DoctorCard";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function DoctorData({ email }) {
  const [Data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
  const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("jwtToken");

    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    return await fetch(url, {
      ...options,
      headers: headers,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await authFetch(
          "http://localhost:6969/patient/getByEmail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (patientResponse.status === 404) {
          setData({});
          setIsData(false);
          return;
        }

        if (patientResponse.status === 500) {
          toast.error("Internal server error");
          return;
        }

        const patientData = await patientResponse.json();

        const doctorResponse = await authFetch(
          "http://localhost:6969/doctor/getByLocation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ location: patientData.location }),
          }
        );

        if (doctorResponse.status === 404) {
          setData({});
          setIsData(false);
          return;
        }

        if (doctorResponse.status === 500) {
          toast.error("Internal server error");
          return;
        }

        const doctorsData = await doctorResponse.json();
        doctorsData.sort((a, b) => {
          const specArrA = a.specialisation
            .toLowerCase()
            .split(",")
            .map((spec) => spec.trim())
            .sort();
          const specArrB = b.specialisation
            .toLowerCase()
            .split(",")
            .map((spec) => spec.trim())
            .sort();

          const sortedSpecA = specArrA.join(",");
          const sortedSpecB = specArrB.join(",");

          if (sortedSpecA < sortedSpecB) {
            return -1;
          }
          if (sortedSpecA > sortedSpecB) {
            return 1;
          }
          return 0;
        });

        setData(doctorsData);
        setIsData(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Toaster />

      <div className={`flex flex-${isData ? 'wrap' : 'col'} max-w-screen-lg m-auto py-24 px-5`}>
        {/*Map */}
        <div className="m-2">
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
        {isData ? Data.map((data, index) => (
              <DoctorCard
                key={index}
                name={data.name}
                specialisation={data.specialisation}
                clinic={data.clinic}
                workingHours={data.workingHours}
                location={data.location}
              />
            ))
          : <div className="">No Data To Show</div> 
          }
      </div>
    </>
  );
}

export default DoctorData;
