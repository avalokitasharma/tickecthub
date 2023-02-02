import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
    var signin: () => Promise<string[]>;
}

let mongo:any
beforeAll( async () => {
    process.env.JWT_KEY = 'asdfghjkl'; 
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {})
    
})

beforeEach( async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
if (mongo) {
    await mongo.stop();
}   
await mongoose.connection.close();
});

global.signin = async () => {
    const authRes = await request(app)
        .post("/api/users/signup")
        .send({
            email: "abc@abc.com",
            password: "abcabc"
        })
        .expect(201);
    const cookie = authRes.get('Set-Cookie');

    return cookie;
}