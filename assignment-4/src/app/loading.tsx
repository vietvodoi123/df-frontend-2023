'use client'
import React from 'react'
import { useTheme } from './context/themeContext'

type Props = {}

function loading({}: Props) {
  const { colorMode } = useTheme()
  return (
    <div className="loading w-[100px] h-[100px] bg-transparent flex justify-center items-center mt-[130px]">
      <div
        className={`border-solid border-[5px] border-${
          colorMode === 'light' ? 'primary' : 'white'
        } rounded-full `}
      ></div>
    </div>
  )
}

export default loading
