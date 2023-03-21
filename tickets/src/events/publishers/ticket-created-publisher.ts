import { Publisher, Subjects, TicketCreatedEvent } from "@tickethub.as/commons";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    
}