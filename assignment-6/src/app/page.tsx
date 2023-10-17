'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserApi } from '@/api/UserApi'
import Login from './component/login/Login'
import Register from './component/login/Register'

const Home = () => {
  const route = useRouter()

  const [tab, setTab] = useState(0)
  const isAuth = UserApi.isLogin()

  if (isAuth) {
    route.push('/home')
  }
  return (
    <div className=" bg-bgColor dark:bg-bgColorDark w-full h-screen relative">
      {tab === 0 && <Login setTab={setTab} />}
      {tab === 1 && <Register setTab={setTab} />}
    </div>
  )
}

export default Home
