import { useEffect } from 'react';
import { PopupWithForm } from "./PopupWithForm";
import { useFormValidator } from "../hooks/useFormValidator";

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoad }) => {
	const { values, errors, isFormValid, handleChange, resetForm } = useFormValidator();

	useEffect(() => {
		resetForm();
	}, [isOpen]);

	const handleSubmit = (evt) => {
		evt.preventDefault();

		onUpdateAvatar({
			avatar: values.avatar,
		});
	}

	return (
		<PopupWithForm
			name="avatar"
			title="Обновить аватар"
			buttonText={isLoad ? 'Сохранение...' : 'Сохранить'}
			form="avatar"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			isFormValid={!isFormValid}
		>
			<input
				type="url"
				id="avatar"
				name="avatar"
				placeholder="Ссылка на аватар"
				className="popup__input"
				onChange={handleChange}
				required
				value={values.avatar || ''}
			/>
			<span
				id="error-avatar"
				className={`inputError ${errors.avatar ? `inputError_visible` : ""}`}
			>
				{errors.avatar}
			</span>
		</PopupWithForm>
	)
}

