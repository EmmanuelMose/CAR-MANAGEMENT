import request from 'supertest';
import express from 'express';
import * as PaymentService from '../../src/payment/payment.service';
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
} from '../../src/payment/payment.controller';

const app = express();
app.use(express.json());
app.get('/payments', getAllPayments);
app.get('/payments/:id', getPaymentById as any);
app.post('/payments', createPayment as any);
app.put('/payments/:id', updatePayment as any);
app.delete('/payments/:id', deletePayment as any);

jest.mock('../../src/payment/payment.service');

describe('Payment Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /payments - should return all payments', async () => {
    const mockPayments = [
      {
        paymentID: 1,
        bookingID: 1,
        paymentDate: '2024-06-05',
        amount: '250.00',
        paymentMethod: 'Credit Card',
      },
      {
        paymentID: 4,
        bookingID: 4,
        paymentDate: '2024-06-08',
        amount: '325.00',
        paymentMethod: 'Credit Card',
      },
    ];
    (PaymentService.getAll as jest.Mock).mockResolvedValue(mockPayments);

    const res = await request(app).get('/payments');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPayments);
  });

  test('GET /payments/:id - should return a payment by ID', async () => {
    const mockPayment = {
      paymentID: 1,
      bookingID: 1,
      paymentDate: '2024-06-05',
      amount: '250.00',
      paymentMethod: 'Credit Card',
    };
    (PaymentService.getById as jest.Mock).mockResolvedValue(mockPayment);

    const res = await request(app).get('/payments/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPayment);
  });

  test('POST /payments - should create a new payment', async () => {
    const payload = {
      bookingID: 1,
      paymentDate: '2024-06-05',
      amount: '250.00',
      paymentMethod: 'Credit Card',
    };
    const createdPayment = { paymentID: 1, ...payload };
    (PaymentService.create as jest.Mock).mockResolvedValue(createdPayment);

    const res = await request(app).post('/payments').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdPayment);
  });

  test('PUT /payments/:id - should update a payment', async () => {
    const payload = {
      bookingID: 1,
      paymentDate: '2024-06-05',
      amount: '250.00',
      paymentMethod: 'Credit Card',
    };
    const updatedPayment = { paymentID: 1, ...payload };
    (PaymentService.update as jest.Mock).mockResolvedValue(updatedPayment);

    const res = await request(app).put('/payments/1').send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedPayment);
  });

  test('DELETE /payments/:id - should delete a payment', async () => {
    (PaymentService.remove as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete('/payments/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Payment deleted' });
  });

  test('GET /payments/:id - should return 500 if error occurs', async () => {
    (PaymentService.getById as jest.Mock).mockRejectedValue(new Error('Failure'));

    const res = await request(app).get('/payments/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Payment not found' });
  });

  test('POST /payments - should return 500 on create error', async () => {
    (PaymentService.create as jest.Mock).mockRejectedValue(new Error('Creation failed'));

    const res = await request(app).post('/payments').send({
      bookingID: 1,
      paymentDate: '2024-06-05',
      amount: '250.00',
      paymentMethod: 'Credit Card',
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to create payment' });
  });

  test('PUT /payments/:id - should return 500 on update error', async () => {
    (PaymentService.update as jest.Mock).mockRejectedValue(new Error('Update failed'));

    const res = await request(app).put('/payments/1').send({
      bookingID: 1,
      paymentDate: '2024-06-05',
      amount: '250.00',
      paymentMethod: 'Credit Card',
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to update payment' });
  });

  test('DELETE /payments/:id - should return 500 on delete error', async () => {
    (PaymentService.remove as jest.Mock).mockRejectedValue(new Error('Delete failed'));

    const res = await request(app).delete('/payments/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to delete payment' });
  });
});
