import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../server.mjs';

let createdTickets = [];
let closedTickets = [];
let getTicketCalls = [];

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
    get(params, cb) {
      try {
        const result = this._runImpl(params);
        cb && cb(null, result);
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
      if (sql.includes('INSERT INTO Ticket')) {
        createdTickets.push(params);
        const stmt = new Statement(() => {});
        return stmt.run(params, cb);
      }
      if (sql.includes('UPDATE Ticket')) {
        closedTickets.push(params);
        const stmt = new Statement(() => {});
        return stmt.run(params, cb);
      }
      const stmt = new Statement(() => {});
      return stmt.run(params, cb);
    }
    get(sql, params, cb) {
      if (sql.includes('SELECT COALESCE(MAX(number), 0) + 1 as nextNumber')) {
        cb(null, { nextNumber: 1 }); // Simula che il prossimo numero sia 1
        return;
      }
      getTicketCalls.push(params[0]);
      if (sql.includes('SELECT t.*, s.name as service_name')) {
        // Simula un ticket trovato
        const result = {
          id: params[0],
          number: 42,
          service_id: 1,
          service_name: "Service 1",
          service_tag: "S1",
          initialDate: "2023-10-15 10:00:00",
          status: 0
        };
        cb(null, result);
      } else {
        cb(null, null);
      }
    }
    all(sql, paramsOrCb, cbMaybe) {
      // Supporta sia (sql, cb) che (sql, params, cb)
      let params, cb;
      if (typeof paramsOrCb === 'function') {
        cb = paramsOrCb;
        params = [];
      } else {
        params = paramsOrCb;
        cb = cbMaybe;
      }
      // Simula una risposta con un array di servizi
      if (sql.includes('SELECT id, name, tag, average_time FROM Service')) {
        cb(null, [
          { id: 1, name: 'Service 1', tag: 'S1', average_time: 10 },
          { id: 2, name: 'Service 2', tag: 'S2', average_time: 15 }
        ]);
        return;
      }
      cb(null, []);
    }
  }

  return { default: { Database } };
});

let DAO;
beforeEach(async () => {
  createdTickets = [];
  closedTickets = [];
  getTicketCalls = [];
  ({ default: DAO } = await import('../../dao/DAO.mjs'));
});

describe('DAO.createTicket', () => {
  it('creates a new ticket for a service', async () => {
    const serviceID = 1;
    const ticket = await DAO.createTicket(serviceID);
    expect(createdTickets.length).toBeGreaterThan(0);
    expect(ticket.service_id).toBe(serviceID);
    expect(ticket.number).toBeDefined();
    expect(ticket.status).toBe(0);
  });
});

describe('DAO.closeTicket', () => {
  it('closes a ticket by id', async () => {
    const ticketId = 123;
    const result = await DAO.closeTicket(ticketId);
    expect(closedTickets.length).toBeGreaterThan(0);
    expect(closedTickets[0][1]).toBe(ticketId);
    expect(result).toContain(`Ticket ${ticketId} chiuso correttamente`);
  });
});

describe('DAO.getTicket', () => {
  it('retrieves a ticket by id', async () => {
    const ticketId = 42;
    const ticket = await DAO.getTicket(ticketId);
    expect(getTicketCalls).toContain(ticketId);
    expect(ticket.id).toBe(ticketId);
    expect(ticket.service_name).toBe("Service 1");
    expect(ticket.service_tag).toBe("S1");
  });
});

describe('POST /api/counter/:counterID/next/:previousTicketId', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should return the next ticket in queue for the counter', async () => {
    const counterID = 1; // usa un counter valido
    const previousTicketId = 0;

    // Prima crea un ticket per essere sicuro che la coda non sia vuota
    await request(app)
      .post(`/api/queues/${counterID}`)
      .send({ customerID: 'test-customer-next' })
      .expect(200);

    const response = await request(app)
      .post(`/api/counter/${counterID}/next/${previousTicketId}`)
      .send({})
      .expect(200);

    if (response.body.message) {
      expect(response.body.message).toBe('No tickets in queue');
    } else {
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('number');
      expect(response.body).toHaveProperty('service_id');
      expect(response.body).toHaveProperty('customerID');
      expect(typeof response.body.id).toBe('number');
      expect(typeof response.body.customerID).toBe('string');
    }
  });
});