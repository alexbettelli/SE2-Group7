import sqlite from 'sqlite3'
import dayjs from 'dayjs';
import {Service, Counter} from '../models/models.mjs'

const db = new sqlite.Database('./database.db', (err) => {
    if(err) throw err;
})

//TICKET
const createTicket = (serviceID) => {
    return new Promise((resolve, reject) => {
        const today = dayjs().format('YYYY-MM-DD');
        
        const getNextNumberQuery = `
            SELECT COALESCE(MAX(number), 0) + 1 as nextNumber
            FROM Ticket 
            WHERE SUBSTR(initialDate, 1, 10) = ? 
        `;
        
        db.get(getNextNumberQuery, [today], (err, row) => {
            if (err) return reject(err);
            
            const ticketNumber = row.nextNumber;
            const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
            
            const insertQuery = `
                INSERT INTO Ticket (number, service_id, initialDate, status, counter_id)
                VALUES (?, ?, ?, 0, NULL)
            `;
            
            db.run(insertQuery, [ticketNumber, serviceID, now], function(err) {
                if (err) return reject(err);
                
                resolve({
                    id: this.lastID,
                    number: ticketNumber,
                    service_id: serviceID,
                    initialDate: now,
                    status: 0
                });
            });
        });
    });
};

const closeTicket = (ticket_Id) => {
  return new Promise((resolve, reject) => {
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const query = `
        UPDATE Ticket
        SET finalDate = ?, status = 1
        WHERE id = ?;
    `;
    db.run(query, [now, ticket_Id], function(err) {
        if (err) return reject(err);
        // this.changes = number of modified lines. If 0 no changes!
        if (this.changes === 0) return reject(new Error('Ticket not found'));
        resolve(`Ticket ${ticket_Id} chiuso correttamente`);
    });
  });
}

//SERVICES
const getAllServices = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, name, tag, average_time FROM Service;'
    db.all(query, (err, rows) => {
      if(err) return reject(err);
      const services = rows.map(row => new Service(
        row.id,
        row.tag,           
        row.name,          
        row.average_time
      ))
      resolve(services);
    })
  });
}
//extract the list of services assignet to the specific counter_id
const getServicesAssignedToCounter = (counter_id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT service_id
                       FROM ServiceAssignment
                       WHERE counter_id = ?`

        db.all(query,[counter_id] , (err, rows) => {
            if(err) reject(err);
            const serviceIDs = rows.map(r => r.service_id);
            resolve(serviceIDs)
        })
    })
}
// COUNTERS
const getAllCounters = () => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT c.id, c.number, s.id as service_id, s.tag as service_tag, s.name as service_name,
             CASE WHEN ea.counter_id IS NOT NULL THEN 1 ELSE 0 END as is_busy
      FROM Counter c 
      JOIN ServiceAssignment sa ON c.id = sa.counter_id 
      JOIN Service s ON sa.service_id = s.id
      LEFT JOIN EmployeeAssignment ea ON c.id = ea.counter_id
      ORDER BY c.number
    `, (err, rows) => {
      if(err) return reject(err);
      resolve(rows.map(row => new Counter(
        row.id,
        row.number,
        row.service_id,
        row.service_tag,
        row.service_name,
        !!row.is_busy
      )));
    })
  });
}

const getTicket = (ticketID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT t.*, s.name as service_name, s.tag as service_tag
            FROM Ticket t
            JOIN Service s ON t.service_id = s.id
            WHERE t.id = ?
        `;
        
        db.get(query, [ticketID], (err, row) => {
            if (err) return reject(err);
            if (!row) return reject(new Error('Ticket not found'));
            resolve(row);
        });
    });
};

/*const assignTicketToCounter = (ticketID, counterID) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE Ticket 
            SET counter_id = ? 
            WHERE id = ?
        `;
        
        db.run(query, [counterID, ticketID], function(err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error('Ticket not found'));
            resolve(`Ticket ${ticketID} assigned to counter ${counterID}`);
        });
    });
};*/

const selectCounter = (counterId, employeeId) => {
  return new Promise((resolve, reject) => {
    db.run(`
      DELETE FROM EmployeeAssignment 
      WHERE employee_id = ?
    `, [employeeId], (err) => {
      if(err) return reject(err);

      db.run(`
        INSERT INTO EmployeeAssignment (employee_id, counter_id, date)
        VALUES (?, ?, CURRENT_TIMESTAMP)
      `, [employeeId, counterId], function(err) {
        if(err) return reject(err);
        resolve({ id: this.lastID, counterId, employeeId });
      });
    });
  });
}

const DAO = {getAllServices, getServicesAssignedToCounter, getAllCounters, closeTicket, createTicket, getTicket, selectCounter}
export default DAO;
