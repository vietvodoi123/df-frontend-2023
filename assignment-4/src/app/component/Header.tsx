'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from '../context/themeContext'

const Header: React.FC = () => {
  const { colorMode, setColor } = useTheme()

  return (
    <header>
      <nav>
        <ul className="nav-list flex items-center justify-between py-[10px] px-[50px]">
          <li className="nav-item-logo text-[18px] font-bold">
            <Link href="/">
              <h1 className="cursor-pointer">
                <span className=" text-primary text-[28px]">Book</span>
                store
              </h1>
            </Link>
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
                <Image
                  src="/sun.png"
                  alt="sun"
                  className="light-btn"
                  width={30}
                  height={30}
                />
              ) : (
                <Image
                  src="/half-moon.png"
                  width={30}
                  height={30}
                  alt="moon"
                  className="dark-btn ml-auto"
                />
              )}
            </button>
            <Image src="/user.png" alt="avatar" width={40} height={40} />
            <p className="name">Việt Phạm</p>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
