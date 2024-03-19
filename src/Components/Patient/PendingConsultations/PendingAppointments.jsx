import React from "react";
import Data from './Data'
import TableCard from "./CardfronPending";
function tablecard() {
  return (
    <>
      <div class="flex flex-col overflow-x-auto">
        <div class="sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
            <div class="overflow-x-auto">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b text-white text-base font-medium dark:border-neutral-500 bg-green-600">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      #
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Specialisation
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Clinic
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Location
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Symptoms
                    </th>
                  </tr>
                </thead>
                <tbody>
                   {Data.map((data,index)=>
                    <TableCard key={index} sr={data.sr} name={data.name} specialisation={data.specialisation} clinic={data.clinic} location={data.location} symptoms={data.symptoms}/>
                   )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
    </>
  );
}

export default tablecard;
