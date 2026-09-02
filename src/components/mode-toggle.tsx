"use client";

/** Toggles between light and dark theme via next-themes; used in Navbar dock */
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="h-full w-full dark:hidden" />
      <MoonIcon className="hidden h-full w-full dark:block" />
    </Button>
  );
}
