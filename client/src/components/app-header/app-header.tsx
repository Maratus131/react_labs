import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logoutAction } from "../../store/api-action";
import { AppRoute, AuthorizationStatus } from "../../const";
import { Logo } from "../logo/logo";

function AppHeader() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userData = useAppSelector((state) => state.userData);
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

    const offers = useAppSelector((state) => state.offers);
    const favoriteLength = offers.filter(o => o.isFavorite).length;

    const onClickLogout = async (e:React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await dispatch(logoutAction());
        navigate(AppRoute.Login);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo />
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            {
                                authorizationStatus === AuthorizationStatus.Auth ? (
                                    <>
                                        <li className="header__nav-item user">
                                            <a className="header__nav-link header__nav-link--profile" href="#">
                                                <div className="header__avatar-wrapper user__avatar-wrapper">
                                                    <img src={userData?.avatar} />
                                                </div>
                                                <span className="header__user-name user__name">
                                                    {userData?.email}
                                                </span>
                                                <Link to="/favorites">
                                                    <span className="header__favorite-count">{favoriteLength}</span>
                                                </Link>
                                            </a>
                                        </li>
                                        <a
                                            className="header__nav-link"
                                            href="/"
                                            onClick={onClickLogout}
                                        >
                                            <span className="header__signout">Sign out</span>
                                        </a>
                                    </>
                                ) : (
                                    <li className="header__nav-item">
                                        <Link className="header__nav-link" to="/login">
                                            <span className="header__login">Sign in</span>
                                        </Link>
                                    </li>
                                )
                            }

                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;