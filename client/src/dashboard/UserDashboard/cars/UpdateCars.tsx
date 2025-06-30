import { useState, useEffect } from "react";
import { toast } from "sonner";
import { carsAPI, type TCar } from "../../../Features/cars/carsAPI";
type UpdateCarProps = {
  car: TCar | null;
};

const UpdateCar = ({ car }: UpdateCarProps) => {
  const [updateCar, { isLoading }] = carsAPI.useUpdateCarMutation({
    fixedCacheKey: "updateCar",
  });

  const [formData, setFormData] = useState({
    carModel: "",
    year: "",
    color: "",
    rentalRate: "",
    availability: true,
    locationID: 1,
  });

  useEffect(() => {
    if (car) {
      setFormData({
        carModel: car.carModel,
        year: car.year.slice(0, 10),
        color: car.color,
        rentalRate: car.rentalRate,
        availability: car.availability,
        locationID: car.locationID ?? 1,
      });
    }
  }, [car]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!car) {
        toast.error("No car selected for update.");
        return;
      }

      await updateCar({ carID: car.carID, ...formData });
      toast.success("Car updated successfully!");
      (document.getElementById("update_car_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car. Please try again.");
    }
  };

  return (
    <dialog id="update_car_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-blue-100 text-blue-700 w-full max-w-lg rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Update Car</h3>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Car Model</label>
            <input
              name="carModel"
              type="text"
              placeholder="Car Model"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.carModel}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input
              name="year"
              type="date"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.year}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Color</label>
            <input
              name="color"
              type="text"
              placeholder="Color"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Rental Rate</label>
            <input
              name="rentalRate"
              type="number"
              placeholder="Rental Rate"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.rentalRate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Availability</label>
            <select
              name="availability"
              className="select select-bordered w-full bg-white text-gray-800"
              value={formData.availability ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: e.target.value === "true",
                }))
              }
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Location ID</label>
            <input
              name="locationID"
              type="number"
              placeholder="Location ID"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.locationID}
              onChange={handleChange}
            />
          </div>
        </form>

        <div className="modal-action flex justify-end gap-4 border-t pt-4 mt-6">
          <button
            className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner" /> Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            type="button"
            onClick={() =>
              (document.getElementById("update_car_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateCar;
