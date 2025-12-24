import { Hono } from 'hono'
import { zValidator} from '@hono/zod-validator'
import { EventRequest } from '../schemas/event.schema.js'
import { DBService } from '../services/db.service.js'
import { HTTPException } from 'hono/http-exception'

export const eventController = new Hono()
const db = new DBService()

eventController.get('/events', async (c) => {
    try {
        
    } catch(error) {

    }
})

eventController.post('/events', zValidator('json', EventRequest, (result, c) => {
    if (!result.success) {
        return c.json({ message: "Error de validación", error: result.error.issues }, 400);
    }
}), async (c) => {
    try {
        const validated_data = c.req.valid('json');
        let token = validated_data.UUID;
        await db.createEvent(token, validated_data.event)
        return c.json({ message: "Post creado exitosamente" }, 201);
    } catch(error) {
        console.log(error)
        throw new HTTPException(500, { message: "No se ha podido completar la operación" })
    }
})