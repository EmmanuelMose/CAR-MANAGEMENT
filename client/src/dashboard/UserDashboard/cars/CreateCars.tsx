import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "sonner";
import { carsAPI } from "../../../Features/cars/carsAPI";

type CreateCarInputs = {
  carModel: string;
  year: string;
  color: string;
  rentalRate: number;
  availability: boolean;
  locationID: number;
};

const schema = yup.object({
  carModel: yup.string().max(100).required("Car model is required"),
  year: yup.string().required("Year is required"),
  color: yup.string().required("Color is required"),
  rentalRate: yup
    .number()
    .typeError("Rental rate must be a number")
    .positive("Rental rate must be positive")
    .required("Rental rate is required"),
  availability: yup.boolean().default(true),
  locationID: yup
    .number()
    .typeError("Location ID must be a number")
    .positive("Location ID must be positive")
    .required("Location ID is required"),
});

const CreateCar = () => {
  const [createCar, { isLoading }] = carsAPI.useCreateCarMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCarInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateCarInputs> = async (data) => {
    try {
      await createCar({
        ...data,
        rentalRate: String(data.rentalRate),
        availability: String(data.availability) === "true",
      }).unwrap();
      toast.success("Car created successfully!");
      reset();
      (document.getElementById("create_car_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error creating car:", error);
      toast.error("Failed to create car. Please try again.");
    }
  };

  return (
    <dialog id="create_car_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-blue-100 text-gray-800 w-full max-w-lg rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-900">Add New Car</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Car Model */}
          <div>
            <label className="block mb-1 font-medium">Car Model</label>
            <input
              type="text"
              {...register("carModel")}
              placeholder="Car Model"
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.carModel && <p className="text-sm text-red-600 mt-1">{errors.carModel.message}</p>}
          </div>

          {/* Year */}
          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input
              type="date"
              {...register("year")}
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.year && <p className="text-sm text-red-600 mt-1">{errors.year.message}</p>}
          </div>

          {/* Color */}
          <div>
            <label className="block mb-1 font-medium">Color</label>
            <input
              type="text"
              {...register("color")}
              placeholder="Color"
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.color && <p className="text-sm text-red-600 mt-1">{errors.color.message}</p>}
          </div>

          {/* Rental Rate */}
          <div>
            <label className="block mb-1 font-medium">Rental Rate</label>
            <input
              type="number"
              step="0.01"
              {...register("rentalRate")}
              placeholder="Rental Rate (e.g. 50.00)"
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.rentalRate && <p className="text-sm text-red-600 mt-1">{errors.rentalRate.message}</p>}
          </div>

          {/* Location ID */}
          <div>
            <label className="block mb-1 font-medium">Location ID</label>
            <input
              type="number"
              {...register("locationID")}
              placeholder="Location ID"
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.locationID && <p className="text-sm text-red-600 mt-1">{errors.locationID.message}</p>}
          </div>

          {/* Availability */}
          <div className="form-control">
            <label className="block font-medium mb-1">Availability</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="true"
                  {...register("availability")}
                  className="radio radio-primary"
                />
                <span>Available</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="false"
                  {...register("availability")}
                  className="radio radio-primary"
                  defaultChecked
                />
                <span>Not Available</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-4 pt-4 border-t mt-6">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => (document.getElementById("create_car_modal") as HTMLDialogElement)?.close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-6 text-black-800 hover:bg-blue-800 transition-colors px-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner" /> Creating...
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateCar;
