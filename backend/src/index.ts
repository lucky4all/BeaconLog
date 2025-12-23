import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { jwt } from 'hono/jwt'
import { csrf } from 'hono/csrf'
import { eventController } from './controllers/event.controller.js'

const app = new Hono()

app.use(cors())
app.use(secureHeaders())
app.use(logger())
app.use(csrf())

app.route("/api", eventController)

export default {
  port: 3000,
  fetch: app.fetch
}