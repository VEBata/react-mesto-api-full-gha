import { useContext } from 'react';
import { Card } from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Main =({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) => {
	const currentUser = useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile content__profile">
				<button
					aria-label="Изменить аватар"
					type="button"
					className="profile__avatar-edit-button"
					onClick={onEditAvatar}
				>
					<img
						src={currentUser.avatar}
						alt="Аватар"
						className="profile__avatar"
					/>
				</button>
				<div className="profile__info">
					<div className="profile__container">
						<h1 className="profile__name">
							{currentUser.name}
						</h1>
						<button
							aria-label="Редактироване"
							type="button"
							className="profile__edit-button"
							onClick={onEditProfile}
						>
						</button>
					</div>
					<p className="profile__opsane">
						{currentUser.about}
					</p>
				</div>
				<button
					aria-label="Добавление"
					type="button"
					className="profile__add-button"
					onClick={onAddPlace}
				>
				</button>
			</section>

			<section className="cards">
				<ul className="cards__container">
					{cards.map((card) => (
						<Card
							key={card._id}
							card={card}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onCardDelete={onCardDelete}
						/>
					))}
				</ul>
			</section>

		</main>
	)
}