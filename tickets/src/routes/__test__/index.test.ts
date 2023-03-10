import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie',global.signin())
        .send({
            title: "Concert",
            price: 100
        }) 
}

it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const resposne = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);
    expect(resposne.body.length).toEqual(3)
           
})