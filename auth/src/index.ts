import mongoose from "mongoose";
import { app } from './app';

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT not defined')
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('connected to mdb');
        
    } catch (error) {
        console.log(error)
    }
}
start();

app.listen(3000, () => {
    console.log("listening on 3000!!!")
})