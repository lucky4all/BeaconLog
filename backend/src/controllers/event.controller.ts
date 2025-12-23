import { Hono } from 'hono'

export const eventController = new Hono()

eventController.get('/events', async (c) => {
    try {} catch(error) {}
})

eventController.post('/events', async (c) => {
    try {} catch(error) {}
})