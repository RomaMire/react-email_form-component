import React from "react";
import { useState } from "react";

const useInput = (validateValue) => {
	const [enteredValue, setEnteredValue] = useState("");

	const [didEdit, setDidEdit] = useState(false);

	const [isCheck, setIsCheck] = useState(false);

	const valueIsValid = validateValue(enteredValue);

	const hasError = !valueIsValid && didEdit;

	const valueChangeHandler = (e) => {
		setEnteredValue(e.target.value);
	};

	const checkboxHandler = () => {
		setIsCheck((is) => !is);
	};

	const inputBlurHandler = (e) => {
		setDidEdit(true);
	};

	const reset = () => {
		setEnteredValue("");
		setDidEdit(false);
		setIsCheck(false);
	};

	return {
		value: enteredValue,
		hasError: hasError,
		isValid: valueIsValid,
		isCheck: isCheck,
		checkboxHandler,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
