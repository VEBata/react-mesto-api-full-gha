import { usePopupClose } from '../hooks/usePopupClose'

export const PopupWithForm = ({ name, title, form, children, buttonText, isOpen, onClose, onSubmit, isFormValid }) => {
	usePopupClose(isOpen, onClose)

	return (
		<div
			className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}
			onClick={onClose}
		>
			<div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
				<button
					aria-label="Закрыть"
					type="button"
					className="popup__close-button"
					onClick={onClose}
				/>
				<h2 className="popup__title">
					{title}
				</h2>
				<form
					name={name}
					className={`popup__form form popup__form_type_${form}`}
					noValidate
					onSubmit={onSubmit}
				>
					{children}
					<button
						type="submit"
						className={`popup__submit-button ${isFormValid ? "popup__submit-button_disabled" : ""}`}
						disabled={isFormValid}
					>
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	)
}