import React from "react";

function UpdateProfile({ isDoctor = true }) {
  return (
    <>
      {isDoctor ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Update Your Profile
            </h2>
          </div>

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="specialisation"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Specialisation
                </label>
                <div className="mt-1">
                  <input
                    id="specialisation"
                    name="specialisation"
                    type="specialisation"
                    autoComplete="specialisation"
                    required
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="certification"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Certification
                </label>
                <div className="mt-1">
                  <input
                    id="certification"
                    name="certification"
                    type="certification"
                    autoComplete="certification"
                    required
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="clinic"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Clinic Name
                </label>
                <div className="mt-1">
                  <input
                    id="clinic"
                    name="clinic"
                    type="clinic"
                    autoComplete="clinic"
                    required
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select Location
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    id="countries"
                    class="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  >
                    <option selected>Choose a Place</option>
                    <option value="JP">Jaipur</option>
                    <option value="DL">Delhi</option>
                    <option value="BG">Bangalore</option>
                    <option value="KGP">Kharagpur</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center  rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Update Now
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Update Your Profile
            </h2>
          </div>

          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Age
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="age"
                    name="age"
                    type="age"
                    autoComplete="current-age"
                    required
                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select Location
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    id="countries"
                    class="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  >
                    <option selected>Choose a Place</option>
                    <option value="JP">Jaipur</option>
                    <option value="DL">Delhi</option>
                    <option value="BG">Bangalore</option>
                    <option value="KGP">Kharagpur</option>
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Update Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProfile;
