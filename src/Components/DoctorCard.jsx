import React from "react";

export default function DoctorCard(props) {
  return (
    <>
      <div className="p-5 m-2 w-80 border-solid border-2 border-indigo-600  rounded-lg shadow-md">
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <div className="">
            <h4 className="text-lg font-bold text-center md:text-left">
              Dr. {props.name}
            </h4>
            <div className="flex">
              <div className="m-2">
                <div className="text-md font-bold text-center md:text-left">
                  Specialisatoin -{" "}
                  <div class="text-gray-600 font-semibold text-sm ml-6">
                    {props.specialisation.map((data, index) => (
                      <li key={index}>{data} </li>
                    ))}
                  </div>
                </div>
                <div className="text-md font-bold text-center md:text-left">
                  Clinic -{" "}
                  <span class="text-gray-600 font-semibold text-sm">
                    {props.clinic}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-2">
          <div className="text-md font-bold text-center md:text-left">
            Working Hours - <br />
            <div class="text-gray-600 font-semibold text-sm ml-6">
              {props.workingHours.map((data, index) => (
                <li key={index}>
                  {data.day} - {data.from} to {data.to} 
                </li>
              ))}
            </div>
          </div>
        </div>
        <button className="m-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Book
        </button>
      </div>
    </>
  );
}
