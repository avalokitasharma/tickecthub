import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan = nats.connect('tickethub','abc',{
    url: 'http://localhost:4222'
});

stan.on('connect',() => {
    console.log("Publisher connected to nats")

    const publisher = new TicketCreatedPublisher(stan);

    try {
        publisher.publish({
            id:'123',
            title: 'concert',
            price: 20,
        })
    } catch(err){
        console.error(err);
    }
    

    // publisher.publish('ticket:created',data,() => {
    //     console.log("event published")
    // })

})