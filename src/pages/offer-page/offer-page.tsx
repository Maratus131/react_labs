import React from "react";
import { NearPlacesCard } from "../../components/near-places-card/near-places-card";

function OfferPage() {
    return (
        <div className="page">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <a className="header__logo-link" href="main.html">
                                <img
                                    className="header__logo"
                                    src="img/logo.svg"
                                    alt="Rent service logo"
                                    width="81"
                                    height="41"
                                />
                            </a>
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <a
                                        className="header__nav-link header__nav-link--profile"
                                        href="#"
                                    >
                                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                                        <span className="header__user-name user__name">
                                            Myemail@gmail.com
                                        </span>
                                        <span className="header__favorite-count">3</span>
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a className="header__nav-link" href="#">
                                        <span className="header__signout">Sign out</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--offer">
                <section className="offer">
                    <div className="offer__gallery-container container">
                        <div className="offer__gallery">
                            {[
                                "img/room.jpg",
                                "img/apartment-01.jpg",
                                "img/apartment-02.jpg",
                                "img/apartment-03.jpg",
                                "img/studio-01.jpg",
                                "img/apartment-01.jpg",
                            ].map((src, i) => (
                                <div className="offer__image-wrapper" key={i}>
                                    <img className="offer__image" src={src} alt="Photo studio" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            <div className="offer__mark">
                                <span>Premium</span>
                            </div>
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">
                                    Beautiful &amp; luxurious studio at great location
                                </h1>
                                <button className="offer__bookmark-button button" type="button">
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use xlinkHref="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">To bookmarks</span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{ width: "80%" }}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">4.8</span>
                            </div>

                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">
                                    Apartment
                                </li>
                                <li className="offer__feature offer__feature--bedrooms">
                                    3 Bedrooms
                                </li>
                                <li className="offer__feature offer__feature--adults">
                                    Max 4 adults
                                </li>
                            </ul>

                            <div className="offer__price">
                                <b className="offer__price-value">€120</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>

                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {[
                                        "Wi-Fi",
                                        "Washing machine",
                                        "Towels",
                                        "Heating",
                                        "Coffee machine",
                                        "Baby seat",
                                        "Kitchen",
                                        "Dishwasher",
                                        "Cabel TV",
                                        "Fridge",
                                    ].map((item) => (
                                        <li className="offer__inside-item" key={item}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                                        <img
                                            className="offer__avatar user__avatar"
                                            src="img/avatar-angelina.jpg"
                                            width="74"
                                            height="74"
                                            alt="Host avatar"
                                        />
                                    </div>
                                    <span className="offer__user-name">Angelina</span>
                                    <span className="offer__user-status">Pro</span>
                                </div>
                                <div className="offer__description">
                                    <p className="offer__text">
                                        A quiet cozy and picturesque that hides behind a a river by
                                        the unique lightness of Amsterdam. The building is green and
                                        from 18th century.
                                    </p>
                                    <p className="offer__text">
                                        An independent House, strategically located between Rembrand
                                        Square and National Opera, but where the bustle of the city
                                        comes to rest in this alley flowery and colorful.
                                    </p>
                                </div>
                            </div>

                            <section className="offer__reviews reviews">
                                <h2 className="reviews__title">
                                    Reviews &middot; <span className="reviews__amount">1</span>
                                </h2>
                                <ul className="reviews__list">
                                    <li className="reviews__item">
                                        <div className="reviews__user user">
                                            <div className="reviews__avatar-wrapper user__avatar-wrapper">
                                                <img
                                                    className="reviews__avatar user__avatar"
                                                    src="img/avatar-max.jpg"
                                                    width="54"
                                                    height="54"
                                                    alt="Reviews avatar"
                                                />
                                            </div>
                                            <span className="reviews__user-name">Max</span>
                                        </div>
                                        <div className="reviews__info">
                                            <div className="reviews__rating rating">
                                                <div className="reviews__stars rating__stars">
                                                    <span style={{ width: "80%" }}></span>
                                                    <span className="visually-hidden">Rating</span>
                                                </div>
                                            </div>
                                            <p className="reviews__text">
                                                A quiet cozy and picturesque that hides behind a river.
                                            </p>
                                            <time
                                                className="reviews__time"
                                                dateTime="2019-04-24"
                                            >
                                                April 2019
                                            </time>
                                        </div>
                                    </li>
                                </ul>

                                <form className="reviews__form form" action="#" method="post">
                                    <label className="reviews__label form__label" htmlFor="review">
                                        Your review
                                    </label>

                                    <div className="reviews__rating-form form__rating">
                                        {[5, 4, 3, 2, 1].map((num) => (
                                            <React.Fragment key={num}>
                                                <input
                                                    className="form__rating-input visually-hidden"
                                                    name="rating"
                                                    value={num}
                                                    id={`${num}-stars`}
                                                    type="radio"
                                                />
                                                <label
                                                    htmlFor={`${num}-stars`}
                                                    className="reviews__rating-label form__rating-label"
                                                    title="rating"
                                                >
                                                    <svg className="form__star-image" width="37" height="33">
                                                        <use xlinkHref="#icon-star"></use>
                                                    </svg>
                                                </label>
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    <textarea
                                        className="reviews__textarea form__textarea"
                                        id="review"
                                        name="review"
                                        placeholder="Tell how was your stay..."
                                    ></textarea>

                                    <div className="reviews__button-wrapper">
                                        <p className="reviews__help">
                                            To submit review please make sure to set{" "}
                                            <span className="reviews__star">rating</span> and describe
                                            your stay with at least{" "}
                                            <b className="reviews__text-amount">50 characters</b>.
                                        </p>
                                        <button
                                            className="reviews__submit form__submit button"
                                            type="submit"
                                            disabled
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>

                    <section className="offer__map map"></section>
                </section>

                <div className="container">
                    <section className="near-places places">
                        <h2 className="near-places__title">Other places in the neighbourhood</h2>
                        <div className="near-places__list places__list">
                            <NearPlacesCard/>
                            <NearPlacesCard/>
                            <NearPlacesCard/>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export { OfferPage };
