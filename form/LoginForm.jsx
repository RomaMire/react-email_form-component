import React, { useState } from "react";

import Input from "./Input";
import Button from "../button/Button";
import Greet from "../greet/Greet";
import useInput from "../../hooks/use-input";
import styles from "./form.module.scss";

const LoginForm = (props) => {
	const { title } = props;
	const [wasSend, setWasSend] = useState(false); //the state of "wasSend" decide which part of the form is to display. If wasSend is "true" we switch the button to "close" and display that the message was sent successfuly thanks to the <Greet> component.

	const messageConfirm = () => {
		// an function for changing the state after sending a message. Is only ativated on "send" <Button> when the form is fulfilled properly
		setWasSend((is) => !is); // we toggle the value and use the same function due to closing the confirm panel.
		console.log("clicked");
	};

	const {
		// every input is based on the useInput hook. We put into the useInput hook the validadion function different for every input
		value: enteredEmail,
		hasError: emailInputError,
		isValid: enteredEmailIsValid,
		valueChangeHandler: emailChangeHandler, // input value check afer keystroke
		inputBlurHandler: emailBlurHandler, // input field is checked thanks to "onBlur" - gives an error when is edit and left without any value
		reset: resetEmailInput,
	} = useInput(
		(value) =>
			value.trim() !== "" &&
			value.includes("@") && // for instance - in case of e-mail we required the "@"" "." and tle length hihger than  4 signs
			value.includes(".") &&
			value.length > 4
	);

	const {
		value: enteredName,
		hasError: nameInputError,
		isValid: enteredNameIsValid,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput,
	} = useInput(
		(value) => value.trim() !== "" && value.length >= 3 && value.length <= 12
	);

	const {
		value: enteredMessage,
		hasError: messageInputError,
		isValid: enteredMessageIsValid,
		valueChangeHandler: messageChangeHandler,
		inputBlurHandler: messageBlurHandler,
		reset: resetMessageInput,
	} = useInput(
		(value) => value.trim() !== "" && value.length >= 10 && value.length < 500 //the message can't be too short or too long
	);

	const {
		isCheck: isCheck,
		checkboxHandler: checkboxHandler,
		defaultChecked: defaultChecked,
		reset: resetCheckboxInput,
	} = useInput((value) => value);

	let formIsValid = false; // in order to check the elements in our form, we set the value "false". Next - we are going to chcek the condition and change the value on true. Than allows us to unblock the "send" button and submit the form

	if (
		enteredEmailIsValid &&
		enteredNameIsValid &&
		enteredMessageIsValid &&
		isCheck
	) {
		formIsValid = true;
	}

	const handleSubmit = (e) => {
		e.preventDefault(); // block the defauld behavior  of the browser
		console.log("User e mail: " + enteredEmail); // we log the entered value into the console
		console.log("User name: " + enteredName);
		console.log("User text: " + enteredMessage);

		if (formIsValid === false) {
			hasError === true;
		}

		setTimeout(() => {
			resetEmailInput();
			resetNameInput();
			resetMessageInput();
			resetCheckboxInput();
		}, 2000); //after 2 seconds this function will clear the inputs fields and uncheck the checkbox
	};

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h3>{title}</h3>

				{wasSend === false ? (
					<div className={styles.form__inputs}>
						<Input
							label="Name"
							id="name" //thanks to specific id we generate a specific input element
							type="text"
							name="name"
							onBlur={nameBlurHandler}
							onChange={nameChangeHandler}
							value={enteredName}
							error={nameInputError && "name is required"}
						/>

						<Input
							label="Email"
							id="email"
							type="email"
							name="email"
							onBlur={emailBlurHandler}
							onChange={emailChangeHandler}
							value={enteredEmail}
							error={emailInputError && "valid email is required"}
						/>

						<Input
							label="Message"
							id="message"
							type="text"
							name="message"
							onBlur={messageBlurHandler}
							onChange={messageChangeHandler}
							value={enteredMessage}
							error={messageInputError && "write an message (10-500 letters)"}
						/>

						<Input
							label="Terms"
							id="checkbox"
							type="checkbox"
							name="checkbox"
							checkText="I accept the privacy policy"
							onClick={checkboxHandler}
							defaultChecked={isCheck}
							error={!isCheck && "* Accept before sending, please."} //you can remove the error text if you need or change the condition and covert the error text at first
						/>
					</div>
				) : (
					<div className={styles.form__confirm}>
						<Greet
							first="Thanks_for_the_message_"
							second="I_will_contact_you_"
							third="Catch_me_on_social_media_!"
							speed="100"
							delay="4000"
							infinite="true"
						/>
					</div>
				)}

				<div className={styles.form__btns}>
					{wasSend === false ? (
						<Button
							text="Send"
							type="submit"
							disabled={!formIsValid}
							onClick={messageConfirm}
						/>
					) : (
						<Button text="Close" type="button" onClick={messageConfirm} />
					)}
				</div>
			</form>
		</>
	);
};

export default LoginForm;
