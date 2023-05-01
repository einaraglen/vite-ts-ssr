import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import PageContextProvider, { PageContext } from './usePageContext'
import AuthProvider from './auth0'
import './index.css'

export { render }
export { passToClient }

const passToClient = ['pageProps']

const render = async (pageContext: PageContext & { request: any}) => {
  const { Page, pageProps, urlPathname } = pageContext
  const pageHtml = renderToString(
    <AuthProvider>
      <PageContextProvider pageContext={pageContext}>
        <StaticRouter location={urlPathname || ""}>
          <Page {...pageProps} />
        </StaticRouter>
      </PageContextProvider>
    </AuthProvider>
  )

  return escapeInject`
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Loading ...</title>
        </head>
        <body>
            <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
        </body>
    </html>`
}
