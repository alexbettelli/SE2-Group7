import sqlite from "sqlite3";
import dayjs from "dayjs";
import { Service } from "./models.mjs"

const db = new sqlite.Database("./database.db", (err) => {
    if (err) throw err;
});

//SERVICES
export function getAllServices() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Service", (err, rows) => {
      if(err) return reject(err);
      resolve(rows.map(row => new Service(
        row.id,
        row.name,
        row.tag,
        row.average_time
      )));
    })
  });
}

