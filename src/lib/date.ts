import {
	eachDayOfInterval,
	addMonths,
	endOfMonth,
	getDay,
	getDate,
	getMonth,
	getYear,
	startOfMonth,
	subDays,
	addDays,
} from "date-fns";

export const startingDate = new Date(2024, 0, 1);
export const weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
export const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const getCalendarDayInterval = (date: Date) => {
	const firstDay = startOfMonth(date);
	const start = subDays(firstDay, getDay(firstDay));

	const finalDay = endOfMonth(date);
	const end = addDays(finalDay, 6 - getDay(finalDay));

	return eachDayOfInterval({ start, end });
};

export const getDateInfo = (date: Date) => {
	return {
		year: getYear(date),
		month: getMonth(date),
		day: getDay(date),
		date: getDate(date),
	};
};
