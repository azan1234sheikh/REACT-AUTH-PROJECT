const express = require("express");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
}));

mongoose.connect("mongodb+srv://azoosheikh713:azansheikh1234@cluster0.1swicvg.mongodb.net/employee", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});


// GET route for /register
app.get('/register', (req, res) => {
    res.send('Welcome to the registration page!');
});

app.post('/register', async (req, res) => {
    const { user, pwd } = req.body; // Extract username and password from req.body

    try {
        // Create a new employee document with the plain password
        const employee = await EmployeeModel.create({ user, password: pwd });

        res.json(employee);
    } catch (error) {
        console.error('Error while registering:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3000;

// Define an async function to hash the password
const hashPassword = async (password, saltRounds) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error while hashing password:', error);
        throw error;
    }
    
};

app.post('/login', async (req, res) => {
    const { user, pwd } = req.body; // Extract username and password from req.body

    try {
        const foundUser = await EmployeeModel.findOne({ user });
        console.log('Found user:', foundUser);
        console.log('pwd:', pwd)
        if (foundUser) {
            // Compare the plain text password from the request body with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(pwd, foundUser.password);

            if (passwordMatch) {
                res.json({ message: 'Login successful', user: foundUser });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error while logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
