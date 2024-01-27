import { ModeToggle } from "./mode-toggle";

export const Header: React.FC = () => {
	return (
		<div className="fixed top-0 left-0 right-0 px-4 flex items-center justify-end bg-tremor-background dark:bg-dark-tremor-background h-header border-b border-tremor-border dark:border-dark-tremor-border">
			<ModeToggle />
		</div>
	);
};
