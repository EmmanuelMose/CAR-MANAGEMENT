import { getOrderByOperators } from "drizzle-orm"
import { create, remove,getAll,getById} from "../../src/customer/customer.service"
import db from "../../src/Drizzle/db"
import { CustomerTable, TICustomer } from "../../src/Drizzle/schema"
//import { TICustomer } from "../../src/Drizzle/schema"



jest.mock("../../src/Drizzle/db", () => ({
    __esModule: true,
    default: {
        insert: jest.fn(() => ({
            values: jest.fn().mockReturnThis()
        })),
        delete: jest.fn(), // Add this line to mock the delete method
        query: {
            CustomerTable: {
                findFirst: jest.fn(),
                findMany: jest.fn()
            }
        }
    }
}))


describe("Auth Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })


    describe("createCustomerService", () => {
        it('should insert a customer and return success message', async () => {
            const  customer = {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@mail.com',
                password: 'hashed'
            };
            const result = await create(customer)
            expect(db.insert).toHaveBeenCalled()
            expect(result).toBe("Customer created successfully")
        })
        })  
    
        


    



    })



//test Get Customer By ID 


    describe("getCustomerByIdService", () => {
        it("should return a Customer if found", async () => {
            const customer = {
                id: 1,
                CustomerName: "Customer 1",
                description: "desc",
                customerId: 1,
                dueDate: new Date()
            };
            (db.query.CustomerTable.findFirst as jest.Mock).mockResolvedValueOnce(customer)

            const result = await getById(1)
            expect(db.query.CustomerTable.findFirst).toHaveBeenCalled()
            expect(result).toEqual(customer)
        })

        it("should return undefined if not found", async () => {
            (db.query.CustomerTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined)
            const result = await getById(9999)
            expect(result).toBeUndefined()
        })


    })



    //test get customers 


describe("getCustomerService", () => {
        it("should return all Customer", async () => {
            const customer = [
                { id: 1, CustomerName: "Customer 1", description: "desc 1", CustomerId: 1, dueDate: new Date() },
                { id: 2, CustomerName: "Customer 2", description: "desc 2", CustomerId: 1, dueDate: new Date() }
            ];
            (db.query.CustomerTable.findMany as jest.Mock).mockResolvedValueOnce(customer)

            const result = await getAll()
            expect(result).toEqual(customer)
        })

        it("should return empty array if no todos", async () => {
            (db.query.CustomerTable.findMany as jest.Mock).mockResolvedValueOnce([])
            const result = await getAll()
            expect(result).toEqual([])
        })
    })





//test Delete Customer 


 describe("deleteCustomerService", () => {
        it("should delete a Customer and return success message", async () => {
            (db.delete as jest.Mock).mockReturnValue({
                where: jest.fn().mockResolvedValueOnce(undefined)
            })

            const result = await remove(1);
            expect(db.delete).toHaveBeenCalledWith(CustomerTable)
            expect(result).toBe("Customer deleted successfully");


        })
    })














    












