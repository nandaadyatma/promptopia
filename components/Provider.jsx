// because session use browser capabilities so that we use client side rendering
'use client';

import { SessionProvider } from 'next-auth/react'

const Provider = ({ children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider