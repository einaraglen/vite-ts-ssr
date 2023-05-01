import { useAuth0 } from '@auth0/auth0-react'
import { Helmet } from 'react-helmet'

export { HomePage as Page }

const HomePage = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="flex flex-col space-y-3 justify-start items-start">
        <span>{isAuthenticated ? 'Logged in' : 'Not Logged in'}</span>
        <button onClick={() => loginWithRedirect()}>Log In</button>
        <button onClick={() => logout({ logoutParams: { returnTo: 'http://127.0.0.1:3000' } })}>Log Out</button>
        <a href="/protected">test</a>
      </div>
    </>
  )
}
