import { Route, Routes, Link } from 'react-router-dom'
import headerLogo from "../images/header-logo.svg";


export const Header = ({ onExit, userEmail, loggedIn, isOpen, onMenu }) => {
	return (
		<header className="header page__header">
			<div className={`header__container ${isOpen ? `active` : ""} ${!loggedIn ? `header__container_wide` : ""}`}>
				<img
					src={headerLogo}
					alt="Логотип место"
					className="header__logo"
				/>
				
					<Routes>
						<Route path="/sign-in" element={
							<Link to="/sign-up" className="header__link">Регистрация</Link>
						}
						/>

						<Route path="/sign-up" element={
							<Link to="/sign-in" className="header__link">Войти</Link>
						}
						/>

						<Route
							path="/"
							element={
								<button className={`header__menu-button ${isOpen ? `active` : ""}`} onClick={onMenu}>
									<span></span>
								</button>
							}
						/>
					</Routes>
			</div>

			{loggedIn &&
				<Routes>
					<Route
						path="/"
						element={
							<>
								<nav className={`header__nav ${isOpen ? `active` : ""}`}>
									<p className="header__email">{userEmail}</p>
									<Link
										to="/sign-in"
										className="header__link header__link_color_grey"
										onClick={onExit}
									>
										Выйти
									</Link>
								</nav>
							</>
						}
					/>
				</Routes>
			}
		</header>
	)
}