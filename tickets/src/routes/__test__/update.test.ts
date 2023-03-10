import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';


it('returns a 404 if provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'concert rock',
            price: 20
        })
        .expect(404);
});

it('returns a 401 if is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'concert rock',
            price: 20
        })
        .expect(401);
});

it('returns 401 if user does not own the ticket', async() => {
    const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie',global.signin())
    .send({
        title: 'concert rock',
        price: 20
    });

   await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',global.signin())
    .send({
        title: 'concert jazz',
        price: 10
    })
    .expect(401);

});

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'abcde',
            price: 20,
        });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: '',
        price: 20
    })
    .expect(400);

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',global.signin())
    .send({
        title: 'concert jazz',
        price: -20
    })
    .expect(400)
})

it('updates the ticket with valid inputs', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'abcde',
            price: 20,
        });
    
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: 'new abcde',
        price: 2000,
    })
    .expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('new abcde');
    expect(ticketResponse.body.price).toEqual(2000);

})