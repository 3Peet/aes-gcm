"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <>
      <Button
        onClick={() => setTheme("dark")}
        className="block px-2 dark:hidden"
        variant="ghost"
      >
        <SunIcon size={20} />
      </Button>
      <Button
        onClick={() => setTheme("light")}
        className="hidden px-2 dark:block"
        variant="ghost"
      >
        <MoonIcon size={20} />
      </Button>
    </>
  )
}
