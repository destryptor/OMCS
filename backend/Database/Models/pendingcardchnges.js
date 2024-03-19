
import React, { useState } from "react";
import toast,{Toaster} from 'react-hot-toast'
import { findOne } from "../../../backend/Database/Models/Patient";
export default function DoctorCard(props) {
   
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

	function getJwtToken() {
		const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
		for (const cookie of cookies) {
			const [name, value] = cookie.split('=');
			if (name === 'jwtToken') {
				return value;
			}
		}
		return null;
	}

	const authFetch = async (url, options = {}) => {
		const token = getJwtToken();

		const headers = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		if (options.headers) {
			Object.assign(headers, options.headers);
		}

		return await fetch(url, {
			...options,
			headers: headers,
		});
	};

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};


	const handleappointment = async () => {
		const patientEmail = props.email;
		const doctorEmail = localStorage.getItem('userEmail');
    try {
     const response= await authFetch('http://localhost:6969/patient/getByEmail', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(patientEmail),
     });
     if (response.ok) {
       console.log('Patient obtained successfully:',response);
     } else {
       const errorMessage = await response.text();
       console.error('Error updating patient:', errorMessage);
       toast.error('Internal server error');
     }
   } catch (error) {
     console.error(error);
     toast.error('Internal server error');
     return;
   }



   const patient_to_upd=await response.json();
   const doct_ind=patient_to_upd.doctor.findIndex(doctor=>doctor.email===doctorEmail);
   if (doct_ind === -1) {
    throw new Error('Doctor not found for the patient');
    }
   patient_to_upd.doctor[doct_ind].status="appointment";



		try {
			const response = await authFetch('http://localhost:6969/patient/updatePatient', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(patient_to_upd),
			});

			if (response.ok) {
				const updatedPatient = await response.json();
				console.log('Patient updated successfully:', updatedPatient);
				toast.success('Consultation request sent successfully');
				setTimeout(() => {
					handleCloseModal();
				}, 2000);
			} else {
				const errorMessage = await response.text();
				console.error('Error updating patient:', errorMessage);
				toast.error('Internal server error');
			}
		} catch (error) {
			console.error(error);
			toast.error('Internal server error');
			return;
		}
     
    try {
			const doc_data_to_update = {
				email: doctorEmail,
				$push: {
					patients: {
						email: patientEmail,
					},
				},
			};

			const response = await authFetch('http://localhost:6969/patient/updateDoctor', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(doc_data_to_update),
			});

			if (response.ok) {
				const updated_doc = await response.json();
				console.log('Doctor updated successfully:', updated_doc);
				toast.success('Consultation request sent successfully');
				setTimeout(() => {
					handleCloseModal();
				}, 2000);
			} else {
				const errorMessage = await response.text();
				console.error('Error updating patient:', errorMessage);
				toast.error('Internal server error');
			}
		} catch (error) {
			console.error(error);
			toast.error('Internal server error');
			return;
		}

	const apt_time=null;//need to change just assigned to null for now
	const apt_date=null;//need to change just assigned to null for now
	const appointment_data= {
		patient: {
			email: patientEmail
		},
		doctor: {
			email: doctorEmail
		},
		date: apt_date, 
		time: apt_time 
	};
	const response = await authFetch('http://localhost:6969/appointment/createAppointment', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(appointment_data),
				});
  };
  return (
    <>
      <div className="p-5 m-2 w-full border-solid border-2 border-green-600  rounded-lg shadow-md bg-stone-100 hover:scale-105 transition-all 	">
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <div className="">
            <h4 className="text-lg font-bold text-left mx-2">
              {props.name}
            </h4>
            <div className="flex">
              <div className="mx-2">
                <div className="text-md font-bold text-center md:text-left">
                  Age -{" "}
                  <span className="text-gray-600 font-semibold text-sm">
                    {props.age}
                  </span>
                </div>
                <div className="text-md font-bold text-left">
                  Symptoms -{" "}
                  <span className="text-gray-600 font-semibold text-sm ">
                    {props.Symptoms}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
        
          <div className="text-md font-bold text-left">
            Location -{" "}
            <span className="text-gray-600 font-semibold text-sm">
              {props.location}
            </span>
          </div>
        </div>
        <div className="flex">
        <button
          className="m-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Online Prescription
        </button>
        <button
          className="m-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Book Appointment
        </button>
        </div>
      </div>
    </>
  );
}

