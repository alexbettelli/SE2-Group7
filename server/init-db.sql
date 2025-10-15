BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Counter" (
	"id"	INTEGER NOT NULL UNIQUE,
	"number"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Employee" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"surname"	TEXT NOT NULL,
	"username"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"type"	TEXT NOT NULL CHECK(type IN ('Customer', 'Officer', 'Manager')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "EmployeeAssignment" (
	"id"	INTEGER NOT NULL UNIQUE,
	"employee_id"	INTEGER NOT NULL,
	"counter_id"	INTEGER NOT NULL,
	"date"	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("counter_id") REFERENCES "Counter"("id"),
	FOREIGN KEY("employee_id") REFERENCES "Employee"("id")
);
CREATE TABLE IF NOT EXISTS "Service" (
	"id"	INTEGER NOT NULL UNIQUE,
	"tag"	TEXT NOT NULL UNIQUE,
	"average_time"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "ServiceAssignment" (
	"id"	INTEGER NOT NULL UNIQUE,
	"counter_id"	INTEGER NOT NULL,
	"service_id"	INTEGER NOT NULL,
	"date"	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("counter_id") REFERENCES "Counter"("id"),
	FOREIGN KEY("service_id") REFERENCES "Service"("id")
);
CREATE TABLE IF NOT EXISTS "Ticket" (
	"id"	INTEGER NOT NULL UNIQUE,
	"number"	INTEGER NOT NULL,
	"service_id"	INTEGER NOT NULL,
	"counter_id"	INTEGER,
	"initialDate"	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"finalDate"	DATETIME,
	"status"	INTEGER NOT NULL DEFAULT 0 CHECK("status" IN (0, 1, 2)),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("counter_id") REFERENCES "Counter"("id"),
	FOREIGN KEY("service_id") REFERENCES "Service"("id")
);
INSERT INTO "Counter" ("id","number") VALUES (1,1),
 (2,2),
 (3,3),
 (4,4),
 (5,5),
 (6,1),
 (7,2),
 (8,3);
INSERT INTO "EmployeeAssignment" ("id","employee_id","counter_id","date") VALUES (1,1,3,'2025-10-15 22:56:34');
INSERT INTO "Service" ("id","tag","average_time","name") VALUES (1,'TAG#1',150,'Service 1'),
 (2,'TAG#2',300,'Service 2'),
 (3,'TAG#3',60,'Service 3'),
 (4,'TAG#4',130,'Service 4');
INSERT INTO "ServiceAssignment" ("id","counter_id","service_id","date") VALUES (1,1,1,'2025-10-12 22:42:09'),
 (2,2,2,'2025-10-12 22:42:09'),
 (3,3,3,'2025-10-12 22:42:09');
INSERT INTO "Ticket" ("id","number","service_id","counter_id","initialDate","finalDate","status") VALUES (1,1,3,NULL,'2025-10-16 00:56:20',NULL,0);
COMMIT;
