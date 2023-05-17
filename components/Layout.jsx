import React from 'react'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Session from './Session'
import Nav from './Nav'

const inter = Inter({ subsets: ['latin'] })

const Layout = ({children}) => {
    const { data: session } = useSession()

    if(!session){
      return (
        <Session />
      )
    }
    return(
      <div className='bg-blue-900 min-h-screen flex'>
        <Nav />
        <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>{children}</div>
      </div>
    )
}

export default Layout