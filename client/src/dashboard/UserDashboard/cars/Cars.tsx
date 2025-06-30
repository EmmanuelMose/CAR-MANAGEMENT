// src/dashboard/AdminDashboard/cars/Cars.tsx

import { carsAPI, type TCar } from "../../../Features/cars/carsAPI";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import CreateCar from "./CreateCars";
import UpdateCar from "./UpdateCars";
import DeleteCar from "./DeleteCars";

const Cars = () => {
  const {
    data: carsData,
    isLoading,
    error,
  } = carsAPI.useGetCarsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
  const [carToDelete, setCarToDelete] = useState<TCar | null>(null);

  const handleEdit = (car: TCar) => {
    setSelectedCar(car);
    (document.getElementById("update_car_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Create Car Button */}
      <div className="flex justify-center mb-6">
        <button
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded shadow-md"
          onClick={() =>
            (document.getElementById("create_car_modal") as HTMLDialogElement)?.showModal()
          }
        >
          Create Car
        </button>
      </div>

      {/* Modals */}
      <CreateCar />
      <UpdateCar car={selectedCar} />
      <DeleteCar car={carToDelete} />

      {/* Status */}
      {isLoading && <p className="text-center text-blue-600">Loading cars...</p>}
      {error && <p className="text-center text-red-600">Error fetching cars.</p>}

      {/* Table */}
      {carsData?.length ? (
        <div className="overflow-x-auto border-4 border-blue-500 rounded-xl shadow-md">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-md">
                <th className="px-4 py-2 border-r border-blue-400">Model</th>
                <th className="px-4 py-2 border-r border-blue-400">Year</th>
                <th className="px-4 py-2 border-r border-blue-400">Color</th>
                <th className="px-4 py-2 border-r border-blue-400">Rate</th>
                <th className="px-4 py-2 border-r border-blue-400">Availability</th>
                <th className="px-4 py-2 border-r border-blue-400">Location ID</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {carsData.map((car) => (
                <tr key={car.carID} className="hover">
                  <td className="px-4 py-2 border-r border-blue-100">{car.carModel}</td>
                  <td className="px-4 py-2 border-r border-blue-100">
                    {new Date(car.year).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-r border-blue-100">{car.color}</td>
                  <td className="px-4 py-2 border-r border-blue-100">${car.rentalRate}</td>
                  <td className="px-4 py-2 border-r border-blue-100">
                    <span
                      className={`badge ${car.availability ? "badge-success" : "badge-error"}`}
                    >
                      {car.availability ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-r border-blue-100">
                    {car.locationID ?? "N/A"}
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(car)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setCarToDelete(car);
                        (document.getElementById("delete_car_modal") as HTMLDialogElement)?.showModal();
                      }}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                    >
                      <MdDeleteForever size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <p className="text-center text-gray-500">No cars found.</p>
      )}
    </div>
  );
};

export default Cars;
