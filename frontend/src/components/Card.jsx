import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Card = ({ card, onCardLike, onCardDelete, onCardClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${
    isLiked && "element__button-active"
  }`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__img"
        onClick={() => {
          onCardClick(card);
        }}
      />
      <div className="element__item">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__likes-info">
          <button
            aria-label="мне нравится"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="element__counter-likes">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          aria-label="Удалить"
          type="button"
          className="element__button_basket"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
};
