import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Card = ({ card, onCardLike, onCardDelete, onCardClick }) => {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = card.owner === currentUser._id;
	const isLiked = card.likes.some(i => i === currentUser._id);
	const cardLikeButtonClassName = (
		`card__button_like ${isLiked && "card__button_like_active"}`
	);

	const handleLikeClick = () => {
		onCardLike(card);
	}

	const handleDeleteClick = () => {
		onCardDelete(card);
	}

	return (
		<li className="card">
			<img
				src={card.link}
				alt={card.name}
				className="card__image"
				onClick={() => {
					onCardClick(card);
				}}
			/>
			<div className="card__name">
				<h2 className="card__title">{card.name}</h2>
				<div className="card__like-container">
					<button
						aria-label="Мне нравтся"
						type="button"
						className={cardLikeButtonClassName}
						onClick={handleLikeClick}
					/>
					<p className="card__like-counter">{card.likes.length}</p>
				</div>
			</div>
			{isOwn && (
				<button
					aria-label="Удалить"
					type="button"
					className="card__button_delete"
					onClick={handleDeleteClick}
				/>
			)}
		</li>
	)
}