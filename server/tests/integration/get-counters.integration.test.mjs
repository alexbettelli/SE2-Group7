import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../server.mjs';

describe('GET /api/counters', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should retrieve all counters successfully', async () => {
    const response = await request(app)
      .get('/api/counters')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return counters with correct properties', async () => {
    const response = await request(app)
      .get('/api/counters')
      .expect(200);

    const firstCounter = response.body[0];
    expect(firstCounter).toHaveProperty('id');
    expect(firstCounter).toHaveProperty('number');
    expect(firstCounter).toHaveProperty('service_id');
    expect(firstCounter).toHaveProperty('service_tag');
    expect(firstCounter).toHaveProperty('service_name');
    expect(firstCounter).toHaveProperty('is_busy');
  });

  it('should return counters with valid data types', async () => {
    const response = await request(app)
      .get('/api/counters')
      .expect(200);

    response.body.forEach(counter => {
      expect(typeof counter.id).toBe('number');
      expect(typeof counter.number).toBe('number');
      expect(typeof counter.service_id).toBe('number');
      expect(typeof counter.service_tag).toBe('string');
      expect(typeof counter.service_name).toBe('string');
      expect(typeof counter.is_busy).toBe('boolean');
    });
  });

  it('should have non-empty service information', async () => {
    const response = await request(app)
      .get('/api/counters')
      .expect(200);

    response.body.forEach(counter => {
      expect(counter.service_tag.length).toBeGreaterThan(0);
      expect(counter.service_name.length).toBeGreaterThan(0);
      expect(counter.service_id).toBeGreaterThan(0);
    });
  });

  it('should return counters ordered by number', async () => {
    const response = await request(app)
      .get('/api/counters')
      .expect(200);

    for (let i = 1; i < response.body.length; i++) {
      expect(response.body[i].number).toBeGreaterThanOrEqual(response.body[i - 1].number);
    }
  });

  it('should correctly reflect busy status', async () => {
    const response = await request(app)
      .get('/api/counters')
      .expect(200);

    response.body.forEach(counter => {
      expect([true, false]).toContain(counter.is_busy);
    });
  });
});
