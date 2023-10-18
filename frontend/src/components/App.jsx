import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from '../utils/Api';
import * as authApi from "../utils/authApi";
import { ProtectedRoute } from "./ProtectedRoute";
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { EditProfilePopup } from "./EditProfilePopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { ImagePopup } from "./ImagePopup";
import { DeleteCardPopup } from "./DeleteCardPopup";
import { Login } from "./Login";
import { Register } from "./Register";
import { InfoTooltip } from "./InfoTooltip";

const App = () => {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
	const [isDeleteCardOpen, setIsDeleteCardPopupOpen] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [currentСardId, setCurrentСardId] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [selectedCard, setSelectedCard] = useState({});
	const [cards, setCards] = useState([]);
	const [isLoading, setIsLoading] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [userData, setUserData] = useState('');
	const [isInfoTooltipStatus, setIsInfoTooltipStatus] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		loggedIn && Promise.all([api.getDataUser(), api.getDataCards()])
			.then(([data, cards]) => {
				setCurrentUser(data.data);
				setCards(cards);
			})
			.catch((err) => {
				console.error(`Promise.all - ошибка: ${err}`);
			});
	}, [loggedIn])

	useEffect(() => {
		handleTokenCheck();
	}, [])

	const handleTokenCheck = () => {
		const jwt = localStorage.getItem('jwt');
		if (!jwt) {
			return;
		}
		authApi
			.getContent(jwt)
			.then((data) => {
				if (data) {
					setUserData(data.data.email);
					setLoggedIn(true);
					navigate('/');
				}
			})
			.catch((err) => {
				console.error(`handleTokenCheck - ошибка: ${err}`)
			});
	};

	const onRegister = ({ email, password }) => {
		authApi
			.registration({ email, password })
			.then((data) => {
				if (data) {
					setIsInfoTooltipStatus(true);
					navigate('/sign-in');
				}
			})
			.catch((err) => {
				setIsInfoTooltipStatus(false);
				console.error(`onRegister - ошибка: ${err}`);
			})
			.finally(() => {
				setIsInfoTooltipOpen(true);
			});
	}

	const onLogin = ({ email, password }) => {
		authApi
			.authorization({ email, password })
			.then((data) => {
				localStorage.setItem('jwt', data.token);
				setLoggedIn(true);
				setUserData(email);
				navigate('/');
			})
			.catch((err) => {
				setIsInfoTooltipStatus(false);
				setIsInfoTooltipOpen(true);
				console.error(`onLogin - ошибка: ${err} `)
			})
	}

	const onExit = () => {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		navigate('/sign-in');
		setUserData('');
		setOpenMenu(false)
	}

	//const onExit = () => {
	//	authApi
	//		.signOut()
	//		.then((res) => {
	//			localStorage.removeItem('jwt');
	//			setLoggedIn(false);
	//			navigate('/sign-in');
	//			setUserData('');
	//			setOpenMenu(false)
	//		})
	//		.catch((err) => {
	//			console.error(`onLogin - ошибка: ${err} `)
	//		})
	//}

	const handleCardClick = (card) => {
		setSelectedCard(card);
		setIsImagePopupOpen(true)
	}

	const isClickOpenMenu = () => {
		setOpenMenu(!openMenu);
	}

	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsImagePopupOpen(false);
		setIsInfoTooltipOpen(false);
		setIsDeleteCardPopupOpen(false);
		setSelectedCard({});
	}

	const handleCardLike = (card) => {
		const isLiked = card.likes.some((i) => i === currentUser._id);
		api
			.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) =>
					state.map((c) => (c._id === card._id ? newCard : c))
				);
			})
			.catch((err) => {
				console.error(`handleCardLike - ошибка: ${err}`);
			});
	}

	const handleCardDelete = () => {
		setIsLoading(true)
		api
			.deleteCard(currentСardId._id)
			.then(() => {
				setCards((state) => state.filter((res) => res._id !== currentСardId._id));
				closeAllPopups();
				setIsLoading(false)
			})
			.catch((err) => {
				console.error(`handleCardDelete - ошибка: ${err}`);
			});
	}

	const handleDeleteClick = (card) => {
		setCurrentСardId(card)
		setIsDeleteCardPopupOpen(true);
	};

	const handleUpdateUser = ({ name, about }) => {
		setIsLoading(true)
		api
			.setDataUser({ name, about })
			.then((userData) => {
				setCurrentUser(userData.data);
				closeAllPopups();
				setIsLoading(false)
			})
			.catch((err) => {
				console.error(`handleUpdateUser - ошибка: ${err}`);
			});
	}

	const handleUpdateAvatar = ({ avatar }) => {
		setIsLoading(true)
		api
			.setUserAvatar({ avatar })
			.then((userAvatar) => {
				setCurrentUser(userAvatar.data);
				closeAllPopups();
				setIsLoading(false)
			})
			.catch((err) => {
				console.error(`handleUpdateAvatar - ошибка: ${err}`);
			});
	}

	const handleAddPlaceSubmit = ({ name, link }) => {
		setIsLoading(true)
		api
			.addNewCard({ name, link })
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
				setIsLoading(false)
			})
			.catch((err) => {
				console.error(`handleAddPlaceSubmit - ошибка: ${err}`);
			});
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="App">
				<div className="page">
					<div className="page__container">
						<Header
							onExit={onExit}
							userEmail={userData}
							loggedIn={loggedIn}
							isOpen={openMenu}
							onMenu={isClickOpenMenu}
						/>

						<Routes>
							<Route
								path="/"
								element={
									<ProtectedRoute
										element={Main}
										loggedIn={loggedIn}
										onEditProfile={setIsEditProfilePopupOpen}
										onAddPlace={setIsAddPlacePopupOpen}
										onEditAvatar={setIsEditAvatarPopupOpen}
										onCardDelete={handleDeleteClick}
										onCardClick={handleCardClick}
										onCardLike={handleCardLike}
										cards={cards}
									/>
								}
							/>

							<Route
								path="/sign-in"
								element={
									<Login
										onLogin={onLogin}
									/>
								}
							/>

							<Route
								path="/sign-up"
								element={
									<Register
										onRegister={onRegister}
									/>
								}
							/>

							<Route
								path="*"
								element={
									<Navigate
										to="/"
										replace
									/>
								}
							/>

						</Routes>

						<Footer />

						{/****PopupProfile****/}
						<EditProfilePopup
							isOpen={isEditProfilePopupOpen}
							onClose={closeAllPopups}
							onUpdateUser={handleUpdateUser}
							isLoad={isLoading}
						/>

						{/****PopupAdd****/}
						<AddPlacePopup
							isOpen={isAddPlacePopupOpen}
							onClose={closeAllPopups}
							onAddPlace={handleAddPlaceSubmit}
							isLoad={isLoading}
						/>

						{/****PopupAvatar****/}
						<EditAvatarPopup
							isOpen={isEditAvatarPopupOpen}
							onClose={closeAllPopups}
							onUpdateAvatar={handleUpdateAvatar}
							isLoad={isLoading}
						/>

						{/****PopupImage****/}
						<ImagePopup
							card={selectedCard}
							isOpen={isImagePopupOpen}
							onClose={closeAllPopups}
						/>

						{/****PopupInfoTooltip****/}
						<InfoTooltip
							isOpen={isInfoTooltipOpen}
							onClose={closeAllPopups}
							isSuccess={isInfoTooltipStatus}
						/>

						{/****PopupDeleteCard****/}
						<DeleteCardPopup
							isOpen={isDeleteCardOpen}
							onClose={closeAllPopups}
							isDeleteCard={handleCardDelete}
							isLoad={isLoading}
						/>
					</div>
				</div>
			</div >
		</CurrentUserContext.Provider>
	);
}

export default App;