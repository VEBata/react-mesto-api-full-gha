import { useContext, useEffect } from 'react';
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormValidator } from "../hooks/useFormValidator";

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoad }) => {
	const currentUser = useContext(CurrentUserContext);
	const { values, errors, isFormValid, setIsFormValid, setValues, handleChange } = useFormValidator();

	useEffect(() => {
		setIsFormValid(true);
		setValues({
			name: currentUser.name,
			about: currentUser.about
		})
	}, [currentUser, isOpen]);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		onUpdateUser({
			name: values.name,
			about: values.about
		});
	}

	return (
		<PopupWithForm
			name="profile"
			title="Редактировать профиль"
			buttonText={isLoad ? 'Сохранение...' : 'Сохранить'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isFormValid={!isFormValid}
		>
			<input
				type="text"
				id="name"
				name="name"
				placeholder="Имя"
				className="popup__input popup__input_type_name"
				required
				minLength="2"
				maxLength="40"
				value={values.name || ""}
				onChange={handleChange}
			/>
			<span
				id="error-name"
				className={`inputError ${errors.name ? `inputError_visible` : ""}`}
			>
				{errors.name}
			</span>
			<input
				type="text"
				id="about"
				name="about"
				placeholder="О себе"
				className="popup__input popup__input_type_about"
				required
				minLength="2"
				maxLength="200"
				value={values.about || ""}
				onChange={handleChange}
			/>
			<span
				id="error-about"
				className={`inputError ${errors.about ? `inputError_visible` : ""}`}
			>
				{errors.about}
			</span>
		</PopupWithForm>
	)
}