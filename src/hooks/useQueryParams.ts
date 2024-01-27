"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useQueryParams = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const params = useMemo(
		() => new URLSearchParams(searchParams),
		[searchParams]
	);

	const updateSearchParams = useCallback(
		(mapping: { key: string; value: any }[]) => {
			mapping.forEach(({ key, value }) => {
				if (value === "" || value === null || value === undefined) {
					params.delete(key);
				} else {
					params.set(key, value);
				}
			});

			replace(`${pathname}?${params}`);
		},
		[pathname, params, replace]
	);

	return { searchParams, updateSearchParams };
};
