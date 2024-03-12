import React, { useState } from "react";

export default function DoctorCard(props) {
  const renderableWorkingHours = props.workingHours.filter(
    (workingHour) => workingHour.from !== "" && workingHour.to !== ""
  );

  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className=" sm:items-start text-center">
                  <div className="mt-3 text-center sm:mt-0  sm:text-left">
                    <div className="flex flex-row justify-between">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Mention Your Symtoms
                      </h3>
                      <button onClick={handleCloseModal} className=" hover:bg-gray-100 transition-all rounded">&#10060;</button>
                    </div>

                    <div className="mt-2">
                      <textarea
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Kya pareshaani hai bhai tereko"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 ">
                <button className=" inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="p-5 m-2 w-full border-solid border-2 border-green-600  rounded-lg shadow-md bg-stone-100 hover:scale-105 transition-all	">
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <div className="">
            <h4 className="text-lg font-bold text-left mx-2">
              Dr. {props.name}
            </h4>
            <div className="flex">
              <div className="mx-2">
                <div className="text-md font-bold text-left">
                  Specialisation -{" "}
                  <span className="text-gray-600 font-semibold text-sm ">
                    {props.specialisation}
                  </span>
                </div>
                <div className="text-md font-bold text-center md:text-left">
                  Clinic -{" "}
                  <span className="text-gray-600 font-semibold text-sm">
                    {props.clinic}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2">
          <div className="text-md font-bold text-left">
            Working Hours -
            <span className="text-gray-600 font-semibold text-sm ml-1">
              {renderableWorkingHours.map((workingHour, index) => (
                <span key={index}>
                  {workingHour.day} - {workingHour.from} to {workingHour.to}
                  {index !== renderableWorkingHours.length - 1 && ", "}
                </span>
              ))}
            </span>
          </div>
          <div className="text-md font-bold text-left">
            Location -{" "}
            <span className="text-gray-600 font-semibold text-sm">
              {props.location}
            </span>
          </div>
        </div>
        <button
          className="m-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={handleOpenModal}
        >
          Book
        </button>
      </div>
    </>
  );
}
