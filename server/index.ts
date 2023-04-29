import 'dotenv/config'
import * as vite from 'vite'
import express from 'express'
import compression from 'compression'
import { renderPage } from 'vite-plugin-ssr'
import { auth } from "express-openid-connect"

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}

(async () => {

  const isProduction = process.env.NODE_ENV === 'production'
  const root = `${__dirname}/..`
  const port = process.env.PORT || 3000

  const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: 'bGmJ081oNF6V6hGEPhT3vQbbACvS9G0G',
    issuerBaseURL: 'https://dev-viqebuhx.eu.auth0.com',
    secret: 'LONG_RANDOM_STRING',
    routes: {
        callback: '/api/auth/callback'
      }
  };

  const server = express()

  server.use(auth(config));
  server.use(compression())
  server.use(express.text()) 

  const viteDevServer = !isProduction ? await vite.createServer({
    root,
    server: { middlewareMode: 'ssr' }
  }) : undefined

  server.use(
    viteDevServer
      ? viteDevServer.middlewares
      : express.static(`${root}/dist/client`)
  )
  server.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const callbackUrl: string = res.locals.callbackUrl
    const pageContextInit = { url, callbackUrl }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext

    if (!httpResponse) {
      return next()
    }

    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })

})()