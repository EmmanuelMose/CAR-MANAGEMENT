import {createCarService,remove,update,getAll,getById} from "../../src/car/car.service"
import db from "../../src/Drizzle/db"
 import { CarTable } from "../../src/Drizzle/schema"


 //Mock the modules 
 jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        CarTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
        }
    }

}))

beforeEach(() => {
    jest.clearAllMocks();
});





//Test create car
describe("Car Service", () => {
    describe("createCarService", () => {
        it("should insert a car and return the inserted car", async () => {
            const car = {
                carModel: "Test Car",
                year: "2024",
                rentalRate: "100",
                locationID: 1,
                carID: 1,
                color: "Red",
                availability: true
            }; 

const inserted = { id: 1, ...car };

//chaining
(db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([inserted])
                })
            });

            const result = await createCarService(car)
            expect(db.insert).toHaveBeenCalledWith(CarTable)
            expect(result).toEqual(inserted)
        })




 it("should return null if insertion fails", async () => {
        (db.insert as jest.Mock).mockReturnValue({
                        values: jest.fn().mockReturnValue({
                            returning: jest.fn().mockResolvedValueOnce([null])
                        })
                    });
                    const car = {
                        carModel: "Fail Car",
                        year: "2023",
                        rentalRate: "80",
                        locationID: 2,
                        carID: 2,
                        color: "Blue",
                        availability: false
                    };
        
                    const result = await createCarService(car);
                    expect(result).toBeNull()
        
                })

        
    })


//test get all cars 

 describe("getCarService", () => {
        it("should return all cars", async () => {
            const car = [
                { id: 1, carName: "Car 1", description: "desc 1", customerId: 1, dueDate: new Date() },
                { id: 2, carName: "Car 2", description: "desc 2", customerId: 1, dueDate: new Date() }
            ];
            (db.query.CarTable.findMany as jest.Mock).mockResolvedValueOnce(car)

            const result = await getAll()
            expect(result).toEqual(car)
        })

        it("should return empty array if no todos", async () => {
            (db.query.CarTable.findMany as jest.Mock).mockResolvedValueOnce([])
            const result = await getAll()
            expect(result).toEqual([])
        })
    })



    //test get car by ID 

    describe("getCarByIdService", () => {
        it("should return a car if found", async () => {
            const car = {
                id: 1,
                carName: "Car 1",
                description: "desc",
                userId: 1,
                dueDate: new Date()
            };
            (db.query.CarTable.findFirst as jest.Mock).mockResolvedValueOnce(car)

            const result = await getById(1)
            expect(db.query.CarTable.findFirst).toHaveBeenCalled()
            expect(result).toEqual(car)
        })

        it("should return undefined if not found", async () => {
            (db.query.CarTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined)
            const result = await getById(9999)
            expect(result).toBeUndefined()
        })


    })




    //Test update car 
    describe("updateCarService", () => {
        it("should update a car and return success message", async () => {
            (db.update as jest.Mock).mockReturnValue({
                set: jest.fn().mockReturnValue({
                    where: jest.fn().mockResolvedValueOnce(undefined)
                })
            })

            const result = await update(1, {
                carModel: "Updated",
                year: "2024",
                rentalRate: "100",
                carID: 1
            })

            expect(db.update).toHaveBeenCalledWith(CarTable)
            expect(result).toBe("Car updated successfully")
        })
    })




    //test delete car







        })