
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";


export type TCar = {
  carID: number;
  carModel: string;
  year: string; 
  color: string;
  rentalRate: string; 
  availability: boolean;
  locationID: number;
};

export const carsAPI = createApi({
  reducerPath: "carsAPI",
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
  tagTypes: ["Cars"],
  endpoints: (builder) => ({
    
    createCar: builder.mutation<TCar, Partial<TCar>>({
      query: (newCar) => ({
        url: "/cars",
        method: "POST",
        body: newCar,
      }),
      invalidatesTags: ["Cars"],
    }),

    
    getCars: builder.query<TCar[], void>({
      query: () => "/cars",
      transformResponse:(response:{cars:TCar[]})=>response.cars,
      
      providesTags: ["Cars"],
    }),

    
    updateCar: builder.mutation<TCar, Partial<TCar> & { carID: number }>({
      query: ({ carID, ...updates }) => ({
        url: `/cars/${carID}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Cars"],
    }),

    
    deleteCar: builder.mutation<{ success: boolean; id: number }, number>({
      query: (carID) => ({
        url: `/cars/${carID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cars"],
    }),

    
    getAvailableCars: builder.query<TCar[], void>({
      query: () => "/cars/available",
      providesTags: ["Cars"],
    }),
  }),
});


export const {
  useCreateCarMutation,
  useGetCarsQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useGetAvailableCarsQuery,
} = carsAPI;
