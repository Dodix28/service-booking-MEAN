import express from 'express'
import path from "path";
import cors from "cors";
import mongoose from 'mongoose';

import userRouter from './routers/user.router';
import zahtevRouter from './routers/zahtev.router';
import uslugaRouter from './routers/usluga.router';
import rezervacijaRouter from './routers/rezervacija.router';
import kozmeticarRouter from './routers/kozmeticar.router';

const app = express()
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/glamStudio")
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connection ok");
});



//const router = express.Router();
//router.use("/users", userRouter);
app.use('/users', userRouter);
app.use('/requests', zahtevRouter);
app.use('/usluge', uslugaRouter);
app.use('/rezervacije', rezervacijaRouter);
app.use('/kozmeticari', kozmeticarRouter);

app.use('/uploads', express.static(path.join(__dirname, '../src/uploads')));


app.get('/', (req,res)=> {res.send("Hello world!")})
app.listen(4000, ()=>console.log('Express running on port 4000'))
