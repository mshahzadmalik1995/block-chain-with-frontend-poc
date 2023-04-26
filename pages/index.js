import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from './components/login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div  className="flex items-center justify-center">
      <Login />
    </div>
  )
}
