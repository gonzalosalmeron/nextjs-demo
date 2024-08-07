import { useEffect, useState } from 'react'

import { SvgIkea, SvgMoon, SvgSun } from '@/components/svgs'

const themeIcons = {
  light: SvgSun,
  dark: SvgMoon,
  ikea: SvgIkea,
}

type Theme = keyof typeof themeIcons

const themes: Theme[] = Object.keys(themeIcons) as Theme[]

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
    return () => {
      document.documentElement.classList.remove(theme)
    }
  }, [theme])

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    const nextTheme = themes[nextIndex]

    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(nextTheme)
    localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
  }

  const Icon = themeIcons[theme]

  return { theme, toggleTheme, icon: Icon }
}
