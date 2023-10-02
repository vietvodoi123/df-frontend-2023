"use client"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../function/localStorage'

interface ThemeColors {
  text: string
  bgColor: string
  backgroundElm: string
  primary: string
  border: string
}

interface ThemeContextType {
  colorMode: string
  setColor: (value: ThemeType) => void
}

const MyContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme(): ThemeContextType {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const COLORS: Record<string, ThemeColors> = {
  light: {
    text: '#343a40',
    bgColor: '#f8f9fa',
    backgroundElm: 'white',
    primary: '#e23c5f',
    border: '#adb5bd',
  },
  dark: {
    text: 'white',
    bgColor: '#1a1a1a',
    backgroundElm: '#333333',
    primary: '#e23c5f',
    border: 'white',
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const initModeColor = (): ThemeType => {
    const mode = getFromLocalStorage('color-mode') as ThemeType
    if (typeof mode !== 'string') {
      saveToLocalStorage('color-mode', 'light')
      return 'light'
    }
    return mode
  }

  const [colorMode, setColorMode] = useState<ThemeType>(initModeColor)

  const updateColor = useCallback((value: ThemeType) => {
    const root = document.documentElement

    root.style.setProperty(
      '--bgColor',
      value === 'light' ? COLORS.light.bgColor : COLORS.dark.bgColor,
    )
    root.style.setProperty(
      '--text',
      value === 'light' ? COLORS.light.text : COLORS.dark.text,
    )
    root.style.setProperty(
      '--primary',
      value === 'light' ? COLORS.light.primary : COLORS.dark.primary,
    )
    root.style.setProperty(
      '--border',
      value === 'light' ? COLORS.light.border : COLORS.dark.border,
    )
    root.style.setProperty(
      '--backgroundElm',
      value === 'light'
        ? COLORS.light.backgroundElm
        : COLORS.dark.backgroundElm,
    )
  }, [])

  const setColor = useCallback(
    (value: ThemeType) => {
      setColorMode(value)
      saveToLocalStorage('color-mode', value)
      updateColor(value)
    },
    [updateColor],
  )

  useEffect(() => {
    updateColor(colorMode)
  }, [colorMode, updateColor])

  const memoizedValue = useMemo(
    () => ({
      colorMode,
      setColor,
    }),
    [colorMode, setColor],
  )

  return (
    <MyContext.Provider value={memoizedValue}>{children}</MyContext.Provider>
  )
}
