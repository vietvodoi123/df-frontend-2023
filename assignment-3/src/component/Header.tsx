import React from 'react'
import { useTheme } from '../context/themeContext'

const Header: React.FC = () => {
  const { colorMode, setColor } = useTheme()

  return (
    <header>
      <nav>
        <ul className="nav-list flex space-between items-center container">
          <li className="nav-item-logo">
            <h1>Bookstore</h1>
          </li>
          <li className="nav-item-user flex space-between items-center">
            <button
              onClick={() => {
                if (colorMode === 'light') {
                  setColor('dark')
                } else {
                  setColor('light')
                }
              }}
              className="btn toggler-box flex space-between items-center"
            >
              {colorMode === 'light' ? (
                <img
                  src="/sun.png"
                  alt="sun"
                  className="light-btn"
                  width={24}
                  height={24}
                />
              ) : (
                <img
                  src="/half-moon.png"
                  width={24}
                  height={24}
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
