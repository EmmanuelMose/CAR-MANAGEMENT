import {create,getAll,getById,remove,update} from "../../src/booking/booking.service"
import db from "../../src/Drizzle/db"
import { BookingsTable } from "../../src/Drizzle/schema"




//Mock the modules 

jest.mock("../../src/Drizzle/db", () => ({
    __esModule: true,
    default: {
        insert: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        query: {
            BookingsTable: {
                findMany: jest.fn(),
                findFirst: jest.fn()
            }
        }
    }
}))

beforeEach(() => {
    jest.clearAllMocks();
});


//Test create bookings

describe("Booking Service", () => {
    describe("createBookingService", () => {
        it("should insert a booking and return the inserted booking", async () => {
            const booking = {
                customerID: 1,
                carID: 2,
                rentalStartDate: "2024-06-01",
                rentalEndDate: "2024-06-10",
                // Optional fields
                bookingID: 1,
                totalAmount: "100.00"
            };  // Mock booking object to be inserted
            const inserted = { id: 1, ...booking };
            // chaining
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([inserted])
                })
            });

            const result = await create(booking)
            expect(db.insert).toHaveBeenCalledWith(BookingsTable)
            expect(result).toEqual(inserted)
        })


it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            });

            const booking = {
                customerID: 2,
                carID: 3,
                rentalStartDate: "2024-07-01",
                rentalEndDate: "2024-07-10",
                // Optional fields
                bookingID: 2,
                totalAmount: "200.00"
            };

            const result = await create(booking);
            expect(result).toBeNull()

        })

        
    })



    //test get all bookings 

 describe("getBookingsService", () => {
        it("should return all bookings", async () => {
            const booking = [
                { id: 1, bookingName: "Booking 1", description: "desc 1", customerId: 1, dueDate: new Date() },
                { id: 2, bookingName: "Booking 2", description: "desc 2", customerId: 1, dueDate: new Date() }
            ];
            (db.query.BookingsTable.findMany as jest.Mock).mockResolvedValueOnce(booking)

            const result = await getAll()
            expect(db.query.BookingsTable.findMany).toHaveBeenCalled()
          
        })
it("should return empty array if no todos", async () => {
            (db.query.BookingsTable.findMany as jest.Mock).mockResolvedValueOnce([])
            const result = await getAll()
            expect(result).toEqual([])
        })
    })






//test get booking by ID
describe("getBookingsByIdService", () => {
    it("should return a Booking if found", async () => {
        const booking = {
            bookingID: 1,
            customerID: 1,
            carID: 2,
            rentalStartDate: "2024-06-01",
            rentalEndDate: "2024-06-10",
            totalAmount: "100.00"
        };
        (db.query.BookingsTable.findFirst as jest.Mock).mockResolvedValueOnce(booking);

        const result = await getById(1);
        expect(db.query.BookingsTable.findFirst).toHaveBeenCalled();
        expect(result).toEqual(booking);
    });

    it("should return undefined if not found", async () => {
        (db.query.BookingsTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined);
        const result = await getById(9999);
        expect(db.query.BookingsTable.findFirst).toHaveBeenCalled();
        expect(result).toBeUndefined();
    });
});





    //test update bookings by ID 
    
    describe("updateBookingService", () => {
        it("should update a booking and return success message", async () => {
            (db.update as jest.Mock).mockReturnValue({
                set: jest.fn().mockReturnValue({
                    where: jest.fn().mockResolvedValueOnce(undefined)
                })
            })

            const result = await update(1, {
                customerID: 1,
                carID: 2,
                rentalStartDate: "2024-06-01",
                rentalEndDate: "2024-06-10",
                totalAmount: "100.00"
            })

            expect(db.update).toHaveBeenCalledWith(BookingsTable)
            expect(result).toBe("Booking updated successfully")
        })
    })










  //  
})
  




