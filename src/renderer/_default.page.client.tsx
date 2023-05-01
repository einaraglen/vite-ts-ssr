export { render }

import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import PageContextProvider, { PageContext } from './usePageContext'
import AuthProvider from './auth0'
import './index.css'

const render = async (pageContext: PageContext) => {
  const { Page } = pageContext
  hydrateRoot(
    document.getElementById('react-root')!,
    <AuthProvider>
      <PageContextProvider pageContext={pageContext}>
        <BrowserRouter>
          <Page {...pageContext.pageProps} />
        </BrowserRouter>
      </PageContextProvider>
    </AuthProvider>
  )
}
