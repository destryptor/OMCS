import React from "react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ConsultCard from "../Components/ConsultCard";
import Data from './Data'
function ConsultData({ location }) {
  return (
    <>
      <Toaster />

      <div className={`flex flex-wrap max-w-screen-lg m-auto   px-5`}>
      {Data.map((data, index) => <ConsultCard key={index} name={data.name} specialisation={data.specialisation} clinic={data.clinic}  location={data.location} symptoms={data.symptoms} />)
}
      </div>
    </>
  );
}

export default ConsultData;
