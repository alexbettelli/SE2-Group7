import { describe, it, expect, vi, beforeEach } from 'vitest';

let allCalls = [];

vi.mock('sqlite3', () => {
  class Database {
    constructor(_path, cb) {
      if (cb) cb(null);
    }
    all(sql, cb) {
      allCalls.push(sql);
      
      const mockServices = [
        { id: 1, name: 'Service A', tag: 'SA', average_time: 300 },
        { id: 2, name: 'Service B', tag: 'SB', average_time: 600 },
        { id: 3, name: 'Service C', tag: 'SC', average_time: 450 }
      ];
      
      cb(null, mockServices);
    }
  }

  return { default: { Database } };
});

let DAO;
beforeEach(async () => {
  allCalls = [];
  ({ default: DAO } = await import('../../dao/DAO.mjs'));
});

describe('DAO.getAllServices', () => {
  it('should retrieve all services from database', async () => {
    const services = await DAO.getAllServices();
    
    expect(services).toHaveLength(3);
    expect(allCalls).toHaveLength(1);
    expect(allCalls[0]).toContain('SELECT');
    expect(allCalls[0]).toContain('FROM Service');
  });

  it('should return services with correct structure', async () => {
    const services = await DAO.getAllServices();
    
    const firstService = services[0];
    expect(firstService).toHaveProperty('id', 1);
    expect(firstService).toHaveProperty('tag', 'SA');
    expect(firstService).toHaveProperty('name', 'Service A');
    expect(firstService).toHaveProperty('average_time', 300);
  });

  it('should map database columns correctly', async () => {
    const services = await DAO.getAllServices();
    
    services.forEach(service => {
      expect(service.id).toBeDefined();
      expect(service.tag).toBeDefined();
      expect(service.name).toBeDefined();
      expect(service.average_time).toBeDefined();
    });
  });
});
