import { useEffect } from 'react'
import { usePopupClose } from '../hooks/usePopupClose'

export const ImagePopup = ({ card, isOpen, onClose }) => {
	usePopupClose(isOpen, onClose)

	return (
		<div
			className={`popup popup_type_image
			${isOpen ? "popup_opened" : ""}`}
			onClick={onClose}
		>
			<figure className="popup__container-image" onClick={(evt) => evt.stopPropagation()}>
				<button
					aria-label="Закрыть"
					type="button"
					className="popup__close-button"
					onClick={onClose}
				>
				</button>
				<img
					src={card.link}
					alt={card.name}
					className="popup__img"
				/>
				<figcaption className="popup__caption">
					{card.name}
				</figcaption>
			</figure>
		</div>
	)
}