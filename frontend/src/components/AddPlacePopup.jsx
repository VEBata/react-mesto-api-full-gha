import { useEffect } from 'react';
import { PopupWithForm } from "./PopupWithForm";
import { useFormValidator } from "../hooks/useFormValidator";

export const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoad }) => {
	const { values, errors, isFormValid, handleChange, resetForm } = useFormValidator();

	useEffect(() => {
		resetForm()
	}, [isOpen]);


	const handleSubmit = (evt) => {
		evt.preventDefault();

		onAddPlace({
			name: values.name,
			link: values.link
		});
	}

	return (
		<PopupWithForm
			name="add"
			title="Новое место"
			buttonText={isLoad ? 'Создание...' : 'Создать'}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isFormValid={!isFormValid}
		>
			<input
				type="text"
				id="text"
				name="name"
				placeholder="Название"
				className="popup__input"
				required
				minLength="2"
				maxLength="30"
				onChange={handleChange}
				value={values.name || ''}
			/>
			<span
				id="error-text"
				className={`inputError ${errors.name ? `inputError_visible` : ""}`}
			>
				{errors.name}
			</span>
			<input
				type="url"
				id="link"
				name="link"
				placeholder="Ссылка на картинку"
				className="popup__input"
				required
				onChange={handleChange}
				value={values.link || ''}
			/>
			<span
				id="error-link"
				className={`inputError ${errors.link ? `inputError_visible` : ""}`}
			>
				{errors.link}
			</span>
		</PopupWithForm>
	)
}