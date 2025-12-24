import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { generateUniqueToken } from '../lib/generateToken.js'

export const authController = new Hono()

authController.get('/token', (c) => {
    try {
        let token = generateUniqueToken()
        
        c.status(201)
        return c.json({
            message: "Token creado exitosamente",
            token: token
        })
    } catch(error) {
        console.error(error)
        throw new HTTPException(500, { message: "No se ha podido completar la operación" })
    }
})