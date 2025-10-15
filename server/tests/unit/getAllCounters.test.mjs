import { describe, it, expect, vi, beforeEach } from 'vitest';

let allCalls = [];

vi.mock('sqlite3', () => {
  class Database {
    constructor(_path, cb) {
      if (cb) cb(null);
    }
    all(sql, cb) {
      allCalls.push(sql);
      
      const mockCounters = [
        { 
          id: 1, 
          number: 1, 
          service_id: 1, 
          service_tag: 'SA', 
          service_name: 'Service A',
          is_busy: 0 
        },
        { 
          id: 2, 
          number: 2, 
          service_id: 2, 
          service_tag: 'SB', 
          service_name: 'Service B',
          is_busy: 1 
        },
        { 
          id: 3, 
          number: 3, 
          service_id: 1, 
          service_tag: 'SA', 
          service_name: 'Service A',
          is_busy: 0 
        }
      ];
      
      cb(null, mockCounters);
    }
  }

  return { default: { Database } };
});

let DAO;
beforeEach(async () => {
  allCalls = [];
  ({ default: DAO } = await import('../../dao/DAO.mjs'));
});

describe('DAO.getAllCounters', () => {
  it('should retrieve all counters from database', async () => {
    const counters = await DAO.getAllCounters();
    
    expect(counters).toHaveLength(3);
    expect(allCalls).toHaveLength(1);
    expect(allCalls[0]).toContain('SELECT');
    expect(allCalls[0]).toContain('FROM Counter');
  });

  it('should return counters with correct structure', async () => {
    const counters = await DAO.getAllCounters();
    
    const firstCounter = counters[0];
    expect(firstCounter).toHaveProperty('id', 1);
    expect(firstCounter).toHaveProperty('number', 1);
    expect(firstCounter).toHaveProperty('service_id', 1);
    expect(firstCounter).toHaveProperty('service_tag', 'SA');
    expect(firstCounter).toHaveProperty('service_name', 'Service A');
    expect(firstCounter).toHaveProperty('is_busy', false);
  });

  it('should correctly convert is_busy to boolean', async () => {
    const counters = await DAO.getAllCounters();
    
    // Counter 1 e 3 are not busy (is_busy = 0)
    expect(counters[0].is_busy).toBe(false);
    expect(counters[2].is_busy).toBe(false);
    
    // Counter 2 is busy (is_busy = 1)
    expect(counters[1].is_busy).toBe(true);
  });

  it('should join counters with their assigned services', async () => {
    const counters = await DAO.getAllCounters();
    
    counters.forEach(counter => {
      expect(counter.service_id).toBeDefined();
      expect(counter.service_tag).toBeDefined();
      expect(counter.service_name).toBeDefined();
      expect(typeof counter.service_id).toBe('number');
      expect(typeof counter.service_tag).toBe('string');
      expect(typeof counter.service_name).toBe('string');
    });
  });

  it('should query includes JOIN with ServiceAssignment and Service tables', async () => {
    await DAO.getAllCounters();
    
    const query = allCalls[0];
    expect(query).toContain('JOIN ServiceAssignment');
    expect(query).toContain('JOIN Service');
    expect(query).toContain('LEFT JOIN EmployeeAssignment');
  });
});
