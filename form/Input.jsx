import React from "react";
import styles from "./form.module.scss";

const Input = ({
	label,
	id,
	checkText,
	error,
	type,
	defaultChecked,
	...props
}) => {
	return (
		<>
			<div className={styles.form__input}>
				<label htmlFor={id}>{label}</label>
				{id === "message" ? ( //if we use "message" "checkbox" or others id value, then we generate a specyfic input element
					<textarea rows="4" id={id} {...props}></textarea>
				) : id === "checkbox" ? (
					<label className={styles.form__checkcontainer}>
						<input
							className={styles.checkbox}
							id={id}
							type="checkbox"
							checked={defaultChecked} // handle the check state during cleaning the form in "resetCheckboxInput()"
							{...props}
						></input>
						<p>{checkText}</p>
					</label>
				) : (
					<input id={id} {...props}></input>
				)}

				<div className={styles.form__error}>{error && <p>{error}</p>}</div>
			</div>
		</>
	);
};

export default Input;
