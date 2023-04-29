export { render }

import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

async function render(pageContext: any) {
  const { Page } = pageContext
  hydrateRoot(
    document.getElementById('react-root')!,
      <BrowserRouter>
        <Page {...pageContext.pageProps} />
      </BrowserRouter>
  )
}
