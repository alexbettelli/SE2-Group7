import fs from 'fs';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, 'database.db');
const SQL_PATH = join(__dirname, 'init-db.sql');

if (fs.existsSync(DB_PATH)) {
  console.log('⚠️  Database already exists at:', DB_PATH);
  console.log('If you want to reinitialize, delete the database.db file first.');
  process.exit(0);
}

const sql = fs.readFileSync(SQL_PATH, 'utf8');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error creating database:', err.message);
    process.exit(1);
  }
  console.log('📦 Creating new database...');
});

db.exec(sql, (err) => {
  if (err) {
    console.error('❌ Error initializing database:', err.message);
    process.exit(1);
  }
  
  console.log('Database initialized successfully!');
  console.log('Location:', DB_PATH);
  console.log('\nDatabase contains:');
  console.log('  - Counter table (8 counters)');
  console.log('  - Service table (4 services)');
  console.log('  - Ticket table');
  console.log('  - Employee table');
  console.log('  - ServiceAssignment table');
  console.log('  - EmployeeAssignment table');
  
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
  });
});
