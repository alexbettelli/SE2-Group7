import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../server.mjs';

describe('POST /api/counters/:id/select', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should select a counter successfully', async () => {
    const response = await request(app)
      .post('/api/counters/1/select')
      .send({ employeeId: 1 })
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('counterId', 1);
    expect(response.body).toHaveProperty('employeeId', 1);
  });

  it('should mark counter as busy after selection', async () => {
    const counterId = 3;
    const employeeId = 999;

    await request(app)
      .post(`/api/counters/${counterId}/select`)
      .send({ employeeId })
      .expect(200);

    const response = await request(app)
      .get('/api/counters')
      .expect(200);

    const counter = response.body.find(c => c.id === counterId);
    expect(counter.is_busy).toBe(true);
  });
});
