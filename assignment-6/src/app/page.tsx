'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { UserApi } from '@/api/UserApi'
import Login from './component/login/Login'
import Register from './component/login/Register'
import store from './store/store'
import { setColor } from './store/slice/themeSlice'

const Home = () => {
  const route = useRouter()
  const dispatch = useDispatch()
  const [tab, setTab] = useState(0)
  const isAuth = UserApi.isLogin()

  useEffect(() => {
    const { theme } = store.getState()
    dispatch(setColor(theme.mode))
  }, [])

  if (isAuth) {
    route.push('/home')
  }
  return (
    <>
      {tab === 0 && <Login setTab={setTab} />}
      {tab === 1 && <Register setTab={setTab} />}
    </>
  )
}

export default Home
