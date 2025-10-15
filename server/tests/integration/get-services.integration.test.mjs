import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../server.mjs';

describe('GET /api/services', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should retrieve all services successfully', async () => {
    const response = await request(app)
      .get('/api/services')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return services with correct properties', async () => {
    const response = await request(app)
      .get('/api/services')
      .expect(200);

    const firstService = response.body[0];
    expect(firstService).toHaveProperty('id');
    expect(firstService).toHaveProperty('tag');
    expect(firstService).toHaveProperty('name');
    expect(firstService).toHaveProperty('average_time');
  });

  it('should return services with valid data types', async () => {
    const response = await request(app)
      .get('/api/services')
      .expect(200);

    response.body.forEach(service => {
      expect(typeof service.id).toBe('number');
      expect(typeof service.tag).toBe('string');
      expect(typeof service.name).toBe('string');
      expect(typeof service.average_time).toBe('number');
    });
  });

  it('should have non-empty service names and tags', async () => {
    const response = await request(app)
      .get('/api/services')
      .expect(200);

    response.body.forEach(service => {
      expect(service.name.length).toBeGreaterThan(0);
      expect(service.tag.length).toBeGreaterThan(0);
      expect(service.average_time).toBeGreaterThan(0);
    });
  });
});
