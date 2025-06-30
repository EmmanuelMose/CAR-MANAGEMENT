import { create, getAll, getById, remove, update } from "../../src/payment/payment.service";
import db from "../../src/Drizzle/db";
import { PaymentTable } from "../../src/Drizzle/schema";

// Mock the db module
jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        PaymentTable: {
            findMany: jest.fn(),
            findFirst: jest.fn()
        }
    }
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("Payment Service", () => {

    // Test: create payment
    describe("createPaymentService", () => {
        it("should insert a payment and return the inserted payment", async () => {
            const payment = {
                bookingID: 1,
                paymentDate: new Date().toISOString(),
                amount: "100.00",
                paymentMethod: "Credit Card"
            };
            const inserted = { id: 1, ...payment };

            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([inserted])
                })
            });

            const result = await create(payment);
            expect(db.insert).toHaveBeenCalledWith(PaymentTable);
            expect(result).toEqual(inserted);
        });

        it("should return null if insertion fails", async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            });

            const payment = {
                bookingID: 2,
                paymentDate: new Date().toISOString(),
                amount: "200.00",
                paymentMethod: "Debit Card"
            };

            const result = await create(payment);
            expect(result).toBeNull();
        });
    });

    // Test: get all payments
    describe("getPaymentService", () => {
        it("should return all payments", async () => {
            const payments = [
                { id: 1, paymentName: "Payment 1", description: "desc 1", customerId: 1, dueDate: new Date() },
                { id: 2, paymentName: "Payment 2", description: "desc 2", customerId: 1, dueDate: new Date() }
            ];
            (db.query.PaymentTable.findMany as jest.Mock).mockResolvedValueOnce(payments);

            const result = await getAll();
            expect(result).toEqual(payments);
        });

        it("should return empty array if no payments", async () => {
            (db.query.PaymentTable.findMany as jest.Mock).mockResolvedValueOnce([]);
            const result = await getAll();
            expect(result).toEqual([]);
        });
    });

    // Test: get payment by ID
    describe("getPaymentByIdService", () => {
        it("should return a payment if found", async () => {
            const payment = {
                id: 1,
                paymentName: "Payment 1",
                description: "desc",
                customerId: 1,
                dueDate: new Date()
            };
            (db.query.PaymentTable.findFirst as jest.Mock).mockResolvedValueOnce(payment);

            const result = await getById(1);
            expect(db.query.PaymentTable.findFirst).toHaveBeenCalled();
            expect(result).toEqual(payment);
        });

        it("should return undefined if not found", async () => {
            (db.query.PaymentTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined);

            const result = await getById(9999);
            expect(result).toBeUndefined();
        });
    });

    // Test: update payment
    describe("updatePaymentService", () => {
        it("should update a payment and return updated object", async () => {
            const updated = {
                id: 1,
                bookingID: 1,
                paymentDate: new Date().toISOString(),
                amount: "100.00",
                paymentMethod: "Credit Card"
            };

            (db.update as jest.Mock).mockReturnValue({
                set: jest.fn().mockReturnValue({
                    where: jest.fn().mockReturnValue({
                        returning: jest.fn().mockResolvedValueOnce([updated])
                    })
                })
            });

            const result = await update(1, updated);
            expect(db.update).toHaveBeenCalledWith(PaymentTable);
            expect(result).toEqual(updated);
        });
    });

    // Test: delete payment
    describe("deletePaymentService", () => {
        it("should delete a payment and return success message", async () => {
            (db.delete as jest.Mock).mockReturnValue({
                where: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([{}])
                })
            });

            const result = await remove(1);
            expect(db.delete).toHaveBeenCalledWith(PaymentTable);
            expect(result).toBe("Payment deleted successfully");
        });
    });

});
