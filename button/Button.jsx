import React from "react";

import styles from "./button.module.scss";

const Button = (props) => {
	const { text, type, onClick, disabled } = props;
	return (
		<>
			<button
				className={styles.button}
				text={text}
				type={type}
				onClick={onClick}
				disabled={disabled}
			>
				{text}
			</button>
		</>
	);
};

export default Button;
