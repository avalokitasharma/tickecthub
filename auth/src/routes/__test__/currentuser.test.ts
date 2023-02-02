import { app } from "../../app";
import request from 'supertest';

it('responds with details of the current user', async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .get("/api/users/currentUser")
        .set('Cookie', cookie)
        .send()
        .expect(200);
    expect(response.body.currentUser.email).toEqual('abc@abc.com');
})

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get("/api/users/currentUser")
        .send()
        .expect(200);
    expect(response.body.currentUser).toEqual(null);
})