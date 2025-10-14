import sqlite from 'sqlite3'
import { Service } from '../models/models.mjs';

const db = new sqlite.Database('./database.db', (err) => {
    if(err) throw err;
})

export const getServices = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Service;'
        db.all(query, (err, rows) => {
            if(err) reject(err);
            const services = [];
            rows.forEach((row, idx) => {
                services[idx] = new Service(row.id, row.tag, row.name, row.average_time);
            })
            resolve(services)
        })
    })
}