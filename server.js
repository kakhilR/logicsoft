const express = require('express');
const app = express();
require('dotenv').config();



const Port = process.env.PORT;

const mongoose = require('mongoose');
mongoose.connect(process.env.MongoURI,{ 
    useNewUrlParser:true,
    useUnifiedTopology: true}).then(()=>console.log('database connected')).catch((err)=>console.log(err))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send('hello')
})


const userRouter = require('./routes/userAuth')
const bookSearchRouter = require('./routes/bookSearch')


app.use('/api',userRouter)
app.use('/api',bookSearchRouter)


app.listen(Port,()=>{console.log(`listening on ${Port}`)})



