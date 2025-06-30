import { toast } from "sonner";
import { bookingsAPI, type TBooking } from "../../../Features/bookings/bookingsAPI";

type DeleteBookingProps = {
  booking: TBooking | null;
};

const DeleteBooking = ({ booking }: DeleteBookingProps) => {
  const [deleteBooking, { isLoading }] = bookingsAPI.useDeleteBookingMutation({
    fixedCacheKey: "deleteBooking",
  });

  const handleDelete = async () => {
    try {
      if (!booking) {
        toast.error("No booking selected for deletion.");
        return;
      }

      await deleteBooking(booking.bookingID);
      toast.success("Booking deleted successfully!");
      (document.getElementById("delete_booking_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking. Please try again.");
    }
  };

  return (
    <dialog id="delete_booking_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-blue-100 text-blue-700 w-full max-w-lg rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Delete Booking</h3>
        <p className="mb-6">
          Are you sure you want to delete booking #{booking?.bookingID} for customer{" "}
          <span className="font-semibold">{booking?.customerID}</span>?
        </p>

        <div className="modal-action flex justify-end gap-4 border-t pt-4">
          <button
            className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
          <button
            type="button"
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            onClick={() =>
              (document.getElementById("delete_booking_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteBooking;
