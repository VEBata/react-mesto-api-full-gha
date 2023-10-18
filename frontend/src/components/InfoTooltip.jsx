import checkMarkIcon from '../images/сheck-mark.svg';
import crossIcon from '../images/cross.svg';
import { usePopupClose } from '../hooks/usePopupClose'

export const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
	usePopupClose(isOpen, onClose)

	return (
		<div
			className={`popup popup_type_info-tooltip ${isOpen ? `popup_opened` : ""}`}
			onClick={onClose}
		>
			<div className="popup__container" onClick={(evt) => evt.stopPropagation()} >
				<button
					aria-label="Закрыть"
					type="button"
					className="popup__close-button"
					onClick={onClose}
				/>
				<img
					src={isSuccess ? checkMarkIcon : crossIcon}
					alt={isSuccess ? "Галочка" : "Крестик"}
					className="popup__icon"
					/>
				<h3 className="popup__text">
					{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
				</h3>
			</div>
		</div>
	)
}