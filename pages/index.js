/* eslint-disable @next/next/no-img-element */

import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Button from '@/components/ui/Button'
import Nav from '@/components/Nav'
import Layout from '@/components/Layout'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data: session} = useSession();
  console.log({session})
  if(!session){
    return <div>Loading...</div>
  }
  return(
    <Layout>
   <div className='text-blue-900 flex justify-between'>
    <h2>Hello, <strong>{session?.user?.name}</strong></h2>
   <div className='flex bg-gray-300 gap-1 text-black rounded-md overflow-hidden'> 
      <img src={session?.user?.image} alt='image' className='w-6 h-6'/>
      <span className='px-2'>{session?.user?.name}</span>
    </div>
   </div>
    </Layout>
  )
}



