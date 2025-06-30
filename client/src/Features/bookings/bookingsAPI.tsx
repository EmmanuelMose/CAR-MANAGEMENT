
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";


export type TBooking = {
  bookingID: number;
  carID: number;
  customerID: number;
  rentalStartDate: string; 
  rentalEndDate: string;
  totalAmount: number; 
};

export const bookingsAPI = createApi({
  reducerPath: "bookingsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Bookings"],
  endpoints: (builder) => ({
    
    createBooking: builder.mutation<TBooking, Partial<TBooking>>({
      query: (newBooking) => ({
        url: "/api/bookings", 
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Bookings"],
    }),

   
    getBookings: builder.query<TBooking[], void>({
      query: () => "/api/bookings", 
      providesTags: ["Bookings"],
    }),

    
    getBookingById: builder.query<TBooking, number>({
      query: (id) => `/api/bookings/${id}`, 
      providesTags: ["Bookings"],
    }),

    
    updateBooking: builder.mutation<TBooking, Partial<TBooking> & { bookingID: number }>({
      query: ({ bookingID, ...updates }) => ({
        url: `/api/bookings/${bookingID}`, 
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Bookings"],
    }),

    
    deleteBooking: builder.mutation<{ message: string }, number>({
      query: (bookingID) => ({
        url: `/api/bookings/${bookingID}`, 
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});


export const {
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsAPI;
