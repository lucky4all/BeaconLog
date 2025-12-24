import { prisma } from "../lib/prisma.js";
import { EventSchema } from "../schemas/event.schema.js";
export class DBService {
    constructor() {}

    public async getEventsByUUID(uuid: string) {
        return await prisma.event.findMany({
            where: {
                actor: uuid
            }
        })
    }

    public async createEvent(uuid: string, event: string) {
        return await prisma.event.create({
            data: {
                actor: uuid,
                eventType: event,
            }
        })
    }
}