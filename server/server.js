const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
require('dotenv').config();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { registerUser } = require('../server/controllers/authController');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());

//Database connection
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'568923',
    database:'sweetie_shop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

// Routes
app.get('/', (req, res) => {
    res.send('backend is running.')
})

app.get('/api/sweets', async (req, res) => {
    const query = 'SELECT * FROM sweets';
    try {
        const [results] = await pool.execute(query);
        res.json(results);
    } catch (error) {
        console.error('MySQL query error: ' + error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Register and login user endpoints
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (email ,pass) VALUES(?, ?)', [email, hashedPass]);

        res.status(200).send('User registered successfully.')

    } catch (error) {
        console.error('Error during registration: ', error);
        return res.status(500).send('Error registering user');
    }
})
app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).send('Invalid email or password')
        }

        const user = users[0];

        const passMatch = await bcrypt.compare(password, user.pass);

        if (!passMatch) {
            return res.status(401).send('Invalid email or password');
        }

        res.status(200).send('Login successful');
    } catch (error) {
        console.error('Error during login: ', error);
        return res.status(500).send('Internal Server Error');
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`)
})

module.exports = pool;