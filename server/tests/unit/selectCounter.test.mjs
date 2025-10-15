import { describe, it, expect, vi, beforeEach } from 'vitest';

let deleteCalls = [];
let insertCalls = [];

vi.mock('sqlite3', () => {
  class Statement {
    constructor(runImpl) {
      this._runImpl = runImpl;
    }
    run(params, cb) {
      try {
        this._runImpl(params);
        cb && cb.call(this, null);
      } catch (e) {
        cb && cb(e);
      }
    }
  }

  class Database {
    constructor(_path, cb) {
      if (cb) cb(null);
    }
    run(sql, params, cb) {
      if (sql.includes('DELETE FROM EmployeeAssignment')) {
        deleteCalls.push(params);
        const stmt = new Statement(() => {});
        return stmt.run(params, cb);
      }
      if (sql.includes('INSERT INTO EmployeeAssignment')) {
        insertCalls.push(params);
        const stmt = new Statement(() => {});
        return stmt.run(params, cb);
      }
      const stmt = new Statement(() => {});
      return stmt.run(params, cb);
    }
  }

  return { default: { Database } };
});

let DAO;
beforeEach(async () => {
  deleteCalls = [];
  insertCalls = [];
  ({ default: DAO } = await import('../../dao/DAO.mjs'));
});

describe('DAO.selectCounter', () => {
  it('deletes previous assignments and inserts new one', async () => {
    const employeeId = 99;
    const counterId = 3;
    const result = await DAO.selectCounter(counterId, employeeId);
    expect(result.counterId).toBe(counterId);
    expect(result.employeeId).toBe(employeeId);
    expect(deleteCalls).toEqual([[employeeId]]);
    expect(insertCalls).toEqual([[employeeId, counterId]]);
  });

  it('reassigns the same employee to a new counter', async () => {
    const employeeId = 99;
    const firstCounter = 1;
    const secondCounter = 2;

    const r1 = await DAO.selectCounter(firstCounter, employeeId);
    expect(r1.counterId).toBe(firstCounter);
    expect(r1.employeeId).toBe(employeeId);
    expect(deleteCalls).toEqual([[employeeId]]);
    expect(insertCalls).toEqual([[employeeId, firstCounter]]);

    const r2 = await DAO.selectCounter(secondCounter, employeeId);
    expect(r2.counterId).toBe(secondCounter);
    expect(r2.employeeId).toBe(employeeId);

    expect(deleteCalls).toEqual([[employeeId], [employeeId]]);
    expect(insertCalls).toEqual([[employeeId, firstCounter], [employeeId, secondCounter]]);
  });
});


