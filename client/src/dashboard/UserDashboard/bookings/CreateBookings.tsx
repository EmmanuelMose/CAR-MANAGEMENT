import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bookingsAPI } from "../../../Features/bookings/bookingsAPI";
import { toast } from "sonner";

type CreateBookingInputs = {
  carID: number;
  customerID: number;
  rentalStartDate: string;
  rentalEndDate: string;
  totalAmount: number;
};

const schema = yup.object({
  carID: yup.number().typeError("Car ID must be a number").required("Car ID is required"),
  customerID: yup.number().typeError("Customer ID must be a number").required("Customer ID is required"),
  rentalStartDate: yup.string().required("Rental start date is required"),
  rentalEndDate: yup.string().required("Rental end date is required"),
  totalAmount: yup
    .number()
    .typeError("Total amount must be a number")
    .positive("Amount must be positive")
    .required("Total amount is required"),
});

const CreateBooking = () => {
  const [createBooking, { isLoading }] = bookingsAPI.useCreateBookingMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBookingInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateBookingInputs> = async (data) => {
    try {
      await createBooking(data).unwrap();
      toast.success("Booking created successfully!");
      reset();
      (document.getElementById("create_booking_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  return (
    <dialog id="create_booking_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-blue-100 text-gray-800 max-w-lg w-full rounded-xl shadow-xl p-6">
        <h3 className="text-2xl font-semibold text-center text-gray-900 mb-6">Add New Booking</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Car ID */}
          <div>
            <label className="block mb-1 font-medium">Car ID</label>
            <input
              type="number"
              {...register("carID")}
              placeholder="Enter Car ID"
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.carID && <p className="text-sm text-red-600 mt-1">{errors.carID.message}</p>}
          </div>

          {/* Customer ID */}
          <div>
            <label className="block mb-1 font-medium">Customer ID</label>
            <input
              type="number"
              {...register("customerID")}
              placeholder="Enter Customer ID"
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.customerID && <p className="text-sm text-red-600 mt-1">{errors.customerID.message}</p>}
          </div>

          {/* Rental Start Date */}
          <div>
            <label className="block mb-1 font-medium">Rental Start Date</label>
            <input
              type="date"
              {...register("rentalStartDate")}
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.rentalStartDate && <p className="text-sm text-red-600 mt-1">{errors.rentalStartDate.message}</p>}
          </div>

          {/* Rental End Date */}
          <div>
            <label className="block mb-1 font-medium">Rental End Date</label>
            <input
              type="date"
              {...register("rentalEndDate")}
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.rentalEndDate && <p className="text-sm text-red-600 mt-1">{errors.rentalEndDate.message}</p>}
          </div>

          {/* Total Amount */}
          <div>
            <label className="block mb-1 font-medium">Total Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("totalAmount")}
              placeholder="e.g. 150.00"
              className="input input-bordered w-full bg-white text-gray-800"
            />
            {errors.totalAmount && <p className="text-sm text-red-600 mt-1">{errors.totalAmount.message}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end items-center gap-4 pt-4 border-t mt-6">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => (document.getElementById("create_booking_modal") as HTMLDialogElement)?.close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-6" disabled={isLoading}>
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

export default CreateBooking;
