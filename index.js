const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'backendhw2.mysql.database.azure.com',
  user: 'vineesh',
  password: 'Jagan@123',
  database: 'studentdb',
  port: 3306,
  ssl: {
    rejectUnauthorized: true
  }
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
