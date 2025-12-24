import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { generateUniqueToken } from '../lib/generateToken.js'
import { setCookie } from 'hono/cookie'

export const authController = new Hono()

authController.get('/token', (c) => {
    try {
        let token = generateUniqueToken()
        setCookie(c, "token", token)
        c.status(201)
        return c.json({
            message: "Token creado exitosamente"
        })
    } catch(error) {
        console.error(error)
        throw new HTTPException(500, { message: "No se ha podido completar la operación" })
    }
})