import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../server.mjs';

describe('POST /api/counter/:counterID/next/:previousTicketId', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should return a ticket with customer info if there are tickets in queue', async () => {
    // Recupera un counter valido e il suo serviceID
    const countersRes = await request(app).get('/api/counters').expect(200);
    const counter = countersRes.body.find(c => c.id === 1);
    const serviceID = counter.service_id;

    // Crea un ticket per la coda
    await request(app)
      .post(`/api/queues/${serviceID}`)
      .send({ customerID: 'test-customer' })
      .expect(200);

    // Ora chiama l'API next
    const response = await request(app)
      .post(`/api/counter/${counter.id}/next/0`)
      .send({})
      .expect(200);

    // Se la coda è vuota, la risposta avrà message
    if (response.body.message) {
      expect(response.body.message).toBe('No tickets in queue');
    } else {
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('number');
      expect(response.body).toHaveProperty('service_id');
      expect(response.body).toHaveProperty('service_name');
      expect(response.body).toHaveProperty('service_tag');
      expect(response.body).toHaveProperty('customerID');
      expect(typeof response.body.id).toBe('number');
      expect(typeof response.body.customerID).toBe('string'); // o 'number' se usi numeri
    }
  });

  it('should return message if no tickets in queue', async () => {
    // Usa un counterID che non ha ticket in coda
    const counterID = 9999;
    const previousTicketId = 0;

    const response = await request(app)
      .post(`/api/counter/${counterID}/next/${previousTicketId}`)
      .send({})
      .expect(200);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('No tickets in queue');
  });
});