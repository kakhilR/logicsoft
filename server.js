const express = require('express');
const app = express();
require('dotenv').config();



const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send('hello')
})

const bookSearchRouter = require('./routes/bookSearch')



app.use('/api',bookSearchRouter)


app.listen(Port,()=>{console.log(`listening on ${Port}`)})



