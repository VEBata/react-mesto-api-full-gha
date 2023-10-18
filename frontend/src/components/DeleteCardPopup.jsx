import { PopupWithForm} from "./PopupWithForm";

export const DeleteCardPopup = ({ isOpen, onClose, isDeleteCard, isLoad }) => {
	const handleSubmit = (evt) => {
		evt.preventDefault();
		isDeleteCard();
	}

	return (
		<PopupWithForm
			name="popup-form"
			title="Вы уверены?"
			buttonText={isLoad ? 'Удаление...' : 'Да'}
			form="avatar"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		/>
	);
}