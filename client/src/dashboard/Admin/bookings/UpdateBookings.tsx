import { useState, useEffect } from "react";
import { toast } from "sonner";
import { bookingsAPI, type TBooking } from "../../../Features/bookings/bookingsAPI";

type UpdateBookingProps = {
  booking: TBooking | null;
};

const UpdateBooking = ({ booking }: UpdateBookingProps) => {
  const [updateBooking, { isLoading }] = bookingsAPI.useUpdateBookingMutation({
    fixedCacheKey: "updateBooking",
  });

  const [formData, setFormData] = useState({
    carID: 0,
    customerID: 0,
    rentalStartDate: "",
    rentalEndDate: "",
    totalAmount: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        carID: booking.carID,
        customerID: booking.customerID,
        rentalStartDate: booking.rentalStartDate.slice(0, 10),
        rentalEndDate: booking.rentalEndDate.slice(0, 10),
        totalAmount: booking.totalAmount.toString(),
      });
    }
  }, [booking]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!booking) {
        toast.error("No booking selected for update.");
        return;
      }

      await updateBooking({
        bookingID: booking.bookingID,
        ...formData,
        carID: Number(formData.carID),
        customerID: Number(formData.customerID),
        totalAmount: Number(parseFloat(formData.totalAmount).toFixed(2)),
      });
      toast.success("Booking updated successfully!");
      (document.getElementById("update_booking_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking. Please try again.");
    }
  };

  return (
    <dialog id="update_booking_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-blue-100 text-blue-700 w-full max-w-lg rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Update Booking</h3>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Car ID</label>
            <input
              name="carID"
              type="number"
              placeholder="Car ID"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.carID}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Customer ID</label>
            <input
              name="customerID"
              type="number"
              placeholder="Customer ID"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.customerID}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Rental Start Date</label>
            <input
              name="rentalStartDate"
              type="date"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.rentalStartDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Rental End Date</label>
            <input
              name="rentalEndDate"
              type="date"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.rentalEndDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Total Amount</label>
            <input
              name="totalAmount"
              type="number"
              step="0.01"
              placeholder="Total Amount"
              className="input input-bordered w-full bg-white text-gray-800"
              value={formData.totalAmount}
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
              "Changes"
            )}
          </button>
          <button
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            type="button"
            onClick={() =>
              (document.getElementById("update_booking_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateBooking;
