import { bookingsAPI } from "../../../Features/bookings/bookingsAPI";
import { type TBooking } from "../../../Features/bookings/bookingsAPI";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import CreateBooking from "./CreateBookings";
import UpdateBooking from "./UpdateBookings";
import DeleteBooking from "./DeleteBookings";

const Bookings = () => {
  const {
    data: bookings,
    isLoading,
    error,
  } = bookingsAPI.useGetBookingsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedBooking, setSelectedBooking] = useState<TBooking | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<TBooking | null>(null);

  const handleEdit = (booking: TBooking) => {
    setSelectedBooking(booking);
    (document.getElementById("update_booking_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-center mb-6">
        <button
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded shadow-md"
          onClick={() =>
            (document.getElementById("create_booking_modal") as HTMLDialogElement)?.showModal()
          }
        >
          Create Booking
        </button>
      </div>

      {/* Modals */}
      <CreateBooking />
      <UpdateBooking booking={selectedBooking} />
      <DeleteBooking booking={bookingToDelete} />

      {/* Status */}
      {isLoading && <p className="text-center text-blue-600">Loading bookings...</p>}
      {error && <p className="text-center text-red-600">Error fetching bookings.</p>}

      {/* Table */}
      {bookings && bookings.length > 0 ? (
        <div className="overflow-x-auto border-4 border-blue-500 rounded-xl shadow-md">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-md">
                <th className="px-4 py-2 border-r border-blue-400">Car ID</th>
                <th className="px-4 py-2 border-r border-blue-400">Customer ID</th>
                <th className="px-4 py-2 border-r border-blue-400">Start Date</th>
                <th className="px-4 py-2 border-r border-blue-400">End Date</th>
                <th className="px-4 py-2 border-r border-blue-400">Total Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingID} className="hover">
                  <td className="px-4 py-2 border-r border-blue-100">{booking.carID}</td>
                  <td className="px-4 py-2 border-r border-blue-100">{booking.customerID}</td>
                  <td className="px-4 py-2 border-r border-blue-100">
                    {new Date(booking.rentalStartDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-r border-blue-100">
                    {new Date(booking.rentalEndDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-r border-blue-100">
                    ${booking.totalAmount}
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(booking)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setBookingToDelete(booking);
                        (document.getElementById("delete_booking_modal") as HTMLDialogElement)?.showModal();
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
        !isLoading && <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;
