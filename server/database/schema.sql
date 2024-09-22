CREATE TABLE Customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    phone_number CHAR(11) NOT NULL
);

CREATE TABLE HairStylists (
    stylist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    last_name VARCHAR(15) NOT NULL,
    first_name VARCHAR(15) NOT NULL,
    schedule TEXT
);

CREATE TABLE IF NOT EXISTS "Services" (
    service_id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_name VARCHAR(50) NOT NULL,
    service_desc TEXT,
    price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS "Appointments" (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointment_date DATE NOT NULL,
    appointment_time TIME  NOT NULL,
    customer_id INTEGER,
    stylist_id INTEGER,
    service_id INTEGER,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (stylist_id) REFERENCES HairStylists(stylist_id),
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);
CREATE TABLE Cancellations (
    cancellation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointment_id INTEGER,
    reason VARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES Appoinments(appointment_id)
);

CREATE TABLE sqlite_sequence(name,seq);
