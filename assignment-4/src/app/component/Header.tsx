'use client'
import React from 'react'
import { useTheme } from '../context/themeContext'
import { useRouter } from 'next/navigation'

const Header: React.FC = () => {
  const { colorMode, setColor } = useTheme()
  const router = useRouter()
  return (
    <header>
      <nav>
        <ul className="nav-list flex items-center justify-between py-[10px] px-[50px]">
          <li className="nav-item-logo text-[18px] font-bold">
            <h1 onClick={() => router.push('/')} className="cursor-pointer">
              <span className=" text-primary text-[28px]">Book</span>
              store
            </h1>
          </li>
          <li className="nav-item-user flex items-center justify-between gap-[20px]">
            <button
              onClick={() => {
                if (colorMode === 'light') {
                  setColor('dark')
                } else {
                  setColor('light')
                }
              }}
              className="toggle-btn flex justify-between items-center w-[50px] h-[20px] rounded-full border-2px-solid"
            >
              {colorMode === 'light' ? (
                <img
                  src="/sun.png"
                  alt="sun"
                  className="light-btn"
                  width={30}
                  height={30}
                />
              ) : (
                <img
                  src="/half-moon.png"
                  width={30}
                  height={30}
                  alt="moon"
                  className="dark-btn ml-auto"
                />
              )}
            </button>
            <img src="/user.png" alt="avatar" width="40" />
            <p className="name">Việt Phạm</p>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
