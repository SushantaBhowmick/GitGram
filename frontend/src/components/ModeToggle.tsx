import { Moon, Sun } from "lucide-react"

import { Button } from ".././@/components/ui/button"
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { useTheme } from "../@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className=" rounded-xl border">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="text-black py-2 flex gap-5 px-2 border border-gray-400 mt-2 mb-2 ml-5 rounded-md  bg-gray-200">
        <DropdownMenuItem onClick={() => setTheme("light")} >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className=" ">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
