import React from "react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Data from "./Data";
import PendingCard from "./PendingCard";
function ConsultData({ location }) {
  return (
    <>
      <Toaster />

      <div className={`flex flex-wrap max-w-screen-lg m-auto   px-5`}>
        {Data.map((data, index) => (
          <PendingCard
            key={index}
            name={data.name}
            age={data.age}
            Symptoms={data.Symptoms}
            location={data.location}
          />
        ))}
      </div>
    </>
  );
}

export default ConsultData;
