import { useFormValidator } from "../hooks/useFormValidator";


export const Login = ({ onLogin }) => {
	const { values, errors, isFormValid, handleChange } = useFormValidator();

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onLogin({
			email: values.email,
			password: values.password
		});
	}

	return (
		<section className="login">
			<h2 className="login__title">Вход</h2>
			<form
				className="login__form form"
				onSubmit={handleSubmit}
				noValidate
			>
				<input
					type="email"
					name="email"
					className="login__input"
					placeholder="Email"
					required
					value={values.email || ''}
					onChange={handleChange}
				/>
				<span
					id="error-email"
					className={`inputError ${errors.email ? `inputError_visible` : ""}`}
				>
					{errors.email}
				</span>
				<input
					type="password"
					name="password"
					className="login__input"
					placeholder="Пароль"
					minLength="4"
					required
					value={values.password || ''}
					onChange={handleChange}
				/>
				<span
					id="error-password"
					className={`inputError ${errors.password ? `inputError_visible` : ""}`}
				>
					{errors.password}
				</span>
				<button
					type="submit"
					className={`login__submit-button ${!isFormValid ? "login__submit-button_disabled" : ""}`}
					disabled={!isFormValid}
				>
					Войти
				</button>
			</form>
		</section>
	);
}
