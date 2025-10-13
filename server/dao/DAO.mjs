import sqlite from 'sqlite3'
import {Service, Counter} from '../models/models.mjs'

const db = new sqlite.Database('./database.db', (err) => {
    if(err) throw err;
})

//SERVICES
 const getAllServices = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Service;'
    db.all(query, (err, rows) => {
      if(err) return reject(err);
      const services = rows.map(row => new Service(
        row.id,
        row.name,
        row.tag,
        row.average_time
      ))
      resolve(services);
    })
  });
}

// COUNTERS

// TODO implement busy status based on current tickets
const getAllCounters = () => {
  return new Promise((resolve, reject) => {
    db.all(`
      SELECT c.id, c.number, s.id as service_id, s.tag as service_tag, s.name as service_name
      FROM Counter c 
      JOIN ServiceAssignment sa ON c.id = sa.counter_id 
      JOIN Service s ON sa.service_id = s.id
      ORDER BY c.number
    `, (err, rows) => {
      if(err) return reject(err);
      resolve(rows.map(row => new Counter(
        row.id,
        row.number,
        row.service_id,
        row.service_tag,
        row.service_name,
        false
      )));
    })
  });
}

const DAO = {getAllServices, getAllCounters}
export default DAO;