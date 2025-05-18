const express = require('express');
const { ...Setup } = require('./checkpoint/index');
const userRouter = require('./routes/userRoutes')
const app = express();
// Middleware


Setup.DatabaseConnection('mongodb://127.0.0.1:27017/restApi')
app.use(express.json());

// routes
app.use('/api', userRouter);

// error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'error',
        message: 'Internal server error' 
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


/**
 * # POST example
curl -X POST -H "Content-Type: application/json" -d '{"first_name":"John","last_name":"Doe","email":"johnexample.com","gender":"Male","ip_address":"127.0.0.1"}' http://localhost:3000/api/users

# PATCH example
curl -X PATCH -H "Content-Type: application/json" -d '{"first_name":"Updated"}' http://localhost:3000/api/users/1234567890

# DELETE example
curl -X DELETE http://localhost:3000/api/users/1234567890
 */