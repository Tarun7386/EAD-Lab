const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter=require('./routes/router1');

const app = express();
app.use(cors()); 
app.use(express.json()); 


app.use('/router1', userRouter)

app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const url = 'mongodb://localhost:27017/EAD-TASKS';
mongoose.connect(url)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));


app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
  });




app.listen(9000,()=>{
    console.log('Server connected...')
})