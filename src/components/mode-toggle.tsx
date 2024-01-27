"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Button } from "@tremor/react";
import { useTheme } from "next-themes";

export const ModeToggle: React.FC = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	const toggleDarkMode = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<Button
			variant="secondary"
			icon={isDark ? SunIcon : MoonIcon}
			className="p-1"
			onClick={toggleDarkMode}
		></Button>
	);
};
