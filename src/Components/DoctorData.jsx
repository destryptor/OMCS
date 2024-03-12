import React from "react";
import DoctorCard from "./DoctorCard";
import Data from "./data";
function DoctorData() {
  return (
    <>
      <div className="flex flex-wrap max-w-screen-lg m-auto">
        {/*Map */}
        {Data ? Data.map((data, index) => (
                    <DoctorCard key={index} name={data.name}  specialisation={data.specialisation}  clinic={data.clinic} workingHours={data.workingHours}/>
                )):"No Data To Show"}
      </div>
    </>
  );
}

export default DoctorData;
