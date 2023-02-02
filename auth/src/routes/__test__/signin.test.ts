import request from "supertest";
import { app } from "../../app";

it("fails when an email that does not exist is supplied", async() => {
    return request(app)
        .post("/api/users/signin")
        .send({
            email: "abc@abc.com",
            password: "abcabc"
        })
        .expect(400)
})

it("fails when an incorrect password is supplied", async() => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "abc@abc.com",
            password: "abcabc"
        })
        .expect(201)

    return request(app)
        .post("/api/users/signin")
        .send({
            email: "abc@abc.com",
            password: "abc123"
        })
        .expect(400)
});

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "avis@gmail.com",
            password: "abcabc"
        })
        .expect(201)

    const response =  await request(app)
        .post("/api/users/signin")
        .send({
            email: "avis@gmail.com",
            password: "abcabc"
        })
        .expect(200)
    expect(response.get('Set-Cookie')).toBeDefined();
})

