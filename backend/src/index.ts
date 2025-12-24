import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { csrf } from 'hono/csrf'
import { eventController } from './controllers/event.controller.js'
import { authController } from './controllers/auth.controller.js'
import { rateLimiter } from 'hono-rate-limiter'

const app = new Hono()

app.use(cors({
  origin: "https://beacon-log.netlify.app/"
}))
app.use(secureHeaders())
app.use(logger())
app.use(csrf())
app.use(rateLimiter({
  windowMs: 60000,
  limit: 100,
  keyGenerator: (c) => c.req.header('x-forwarded-for') ?? "",
}))

app.route("/api", eventController)
app.route("/api/auth", authController)

export default app;