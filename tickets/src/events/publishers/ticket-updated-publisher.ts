import { Publisher, Subjects, TicketUpdatedEvent } from "@tickethub.as/commons";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}