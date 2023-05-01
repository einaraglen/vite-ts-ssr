import { Auth0Provider } from '@auth0/auth0-react'
import { ReactNode } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT}
      authorizationParams={{
        redirect_uri: "http://127.0.0.1:3000",
      }}
    >
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider;
