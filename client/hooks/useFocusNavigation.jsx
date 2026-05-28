import { useState } from "react";

export function useFocusNavigation() {
	const [focusedIndex, setFocusedIndex] = useState(0);

	const register = (items) => ({
		focusedIndex,
		setFocusedIndex,
		items,
	});

	return { focusedIndex, setFocusedIndex, register };
}