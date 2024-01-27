"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { weekDays, monthNames, getCalendarDayInterval } from "@/lib/date";
import { Button, TableHeaderCell, TableRow } from "@tremor/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { getDate, getDay, getMonth, getYear } from "date-fns";

export const CalendarDateSelector: React.FC = () => {
	const { searchParams, updateSearchParams } = useQueryParams();

	const selectedYear: number = parseInt(
		searchParams.get("year") ?? getYear(new Date()).toString()
	);
	const selectedMonth: number = parseInt(
		searchParams.get("month") ?? getMonth(new Date()).toString()
	);

	const goToNextMonth = () => {
		let year = selectedYear;
		let nextMonth = (selectedMonth + 1) % 12;
		updateSearchParams([
			{
				key: "month",
				value: nextMonth,
			},
			{
				key: "year",
				value: nextMonth === 0 ? year + 1 : year,
			},
		]);
	};

	const goToPreviousMonth = () => {
		let year = selectedYear;
		let prevMonth = selectedMonth - 1 < 0 ? 11 : (selectedMonth - 1) % 12;
		updateSearchParams([
			{
				key: "month",
				value: prevMonth,
			},
			{
				key: "year",
				value: prevMonth === 11 ? year - 1 : year,
			},
		]);
	};
	return (
		<div className="flex items-center justify-center gap-2 text-sm my-2 w-full">
			<div className="flex items-center justify-center gap-2">
				<Button
					variant="secondary"
					icon={ArrowLeftIcon}
					className="p-1 shrink"
					onClick={goToPreviousMonth}
				></Button>
				<Button className="w-40 text-center py-1" variant="secondary">
					{`${monthNames[selectedMonth]} ${selectedYear}`}
				</Button>
				<Button
					variant="secondary"
					icon={ArrowRightIcon}
					className="p-1 shrink"
					onClick={goToNextMonth}
				></Button>
			</div>
		</div>
	);
};

const data: any = {
	1704265200000: {
		pl: -250,
	},
	1705215600000: {
		pl: 500,
	},
};

export const Calendar: React.FC = () => {
	const { searchParams } = useQueryParams();
	const selectedYear: number = parseInt(
		searchParams.get("year") ?? getYear(new Date()).toString()
	);
	const selectedMonth: number = parseInt(
		searchParams.get("month") ?? getMonth(new Date()).toString()
	);
	const dayInterval = getCalendarDayInterval(
		new Date(selectedYear, selectedMonth)
	);

	return (
		<div className="w-full h-full flex flex-col">
			<CalendarDateSelector />
			<table className="flex flex-col grow">
				<thead className="shrink">
					<TableRow className="flex justify-around">
						{weekDays.map((day) => (
							<TableHeaderCell className="text-center" key={day}>
								{day}
							</TableHeaderCell>
						))}
					</TableRow>
				</thead>
				{/* divide-tremor-border dark:divide-dark-tremor-border */}
				<tbody className="grow grid grid-cols-7">
					{dayInterval.map((day) => (
						<td
							key={day.toString()}
							className={`relative border-t border-tremor-border dark:border-dark-tremor-border text-center ${
								getMonth(day) === selectedMonth
									? "bg-tremor-background dark:bg-dark-tremor-background"
									: "bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle"
							} hover:bg-tremor-brand-muted dark:hover:bg-dark-tremor-brand-muted grow transition-colors ${
								getDay(day) === 6 ? "border-r-0" : "border-r"
							}`}
						>
							<div className="absolute top-2 left-2 z-20">{getDate(day)}</div>
							{data.hasOwnProperty(day.getTime().toString()) && (
								<div
									className={`absolute inset-1 z-10 rounded border-2 flex items-center justify-center ${
										data[day.getTime().toString()].pl < 0
											? "bg-rose-500/50 border-rose-700"
											: "bg-emerald-500/50 border-emerald-700"
									}`}
								>
									<span className="select-none">
										{data[day.getTime().toString()].pl}
									</span>
								</div>
							)}
						</td>
					))}
				</tbody>
			</table>
		</div>
	);
};
