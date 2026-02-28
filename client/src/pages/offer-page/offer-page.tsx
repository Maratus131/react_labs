import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { ReviewsForm } from "../../components/reviews-form/reviews-form";
import { ReviewsList } from "../../components/reviews-list/reviews-list";
import Map from "../../components/map/map";
import { NearPlacesCardList } from "../../components/near-places-list/near-places-list";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchFullOfferAction, fetchReviewsAction } from "../../store/api-action";
import { OffersList } from "../../types/offer";
import AppHeader from "../../components/app-header/app-header";
import { AuthorizationStatus } from "../../const";


function OfferPage() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const offers = useAppSelector((state) => state.offers);
    const offer = useAppSelector((state) => state.fullOffer);
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

    useEffect(() => {
        if (id) {
            dispatch(fetchFullOfferAction(id));
            dispatch(fetchReviewsAction(id));
        }
    }, [id, dispatch]);

    if (!offer) {
        return <NotFoundPage />;
    }

    const ratingPercent = Math.round(offer.rating * 20);

    const nearOffers = offers
        .filter((o) => String(o.id) !== offer.id && o.city.name === offer.city.name)
        .slice(0, 3);

    const nearOffersList: OffersList[] = nearOffers.map((o) => ({
        id: o.id,
        title: o.title,
        type: o.type,
        price: o.price,
        isPremium: o.isPremium,
        rating: o.rating,
        previewImage: o.previewImage,
        city: o.city,
        location: o.location,
        isFavorite: o.isFavorite ?? false
    }));

    const city = {
        lat: offer.city.location.latitude,
        lng: offer.city.location.longitude,
        zoom: offer.city.location.zoom
    };

    const points = [
        {
            id: offer.id,
            title: offer.title,
            lat: offer.location.latitude,
            lng: offer.location.longitude
        }
    ];

    return (
        <div className="page">
            <AppHeader />

            <main className="page__main page__main--offer">
                <section className="offer">
                    <div className="offer__gallery-container container">
                        <div className="offer__gallery">
                            {offer.images.map((src, i) => (
                                <div className="offer__image-wrapper" key={i}>
                                    <img className="offer__image" src={src} alt="Photo studio" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            {offer.isPremium && (
                                <div className="offer__mark">
                                    <span>Premium</span>
                                </div>
                            )}
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">{offer.title}</h1>
                                <button className="offer__bookmark-button button" type="button">
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use xlinkHref="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">To bookmarks</span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{ width: `${ratingPercent}%` }}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">{offer.rating}</span>
                            </div>

                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                                <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
                            </ul>

                            <div className="offer__price">
                                <b className="offer__price-value">€{offer.price}</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>

                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {offer.goods.map((item) => (
                                        <li className="offer__inside-item" key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host.isPro ? "offer__avatar-wrapper--pro" : ""}`}>
                                        <img
                                            className="offer__avatar user__avatar"
                                            src={offer.host.avatarUrl}
                                            width="74"
                                            height="74"
                                            alt="Host avatar"
                                        />
                                    </div>
                                    <span className="offer__user-name">{offer.host.name}</span>
                                    {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                                </div>
                                <div className="offer__description">
                                    <p className="offer__text">{offer.description}</p>
                                </div>
                            </div>

                            <section className="offer__reviews reviews">
                                <ReviewsList/>
                                {authorizationStatus === AuthorizationStatus.Auth ?
                                    <ReviewsForm /> : <></>}
                            </section>
                        </div>
                    </div>

                    <section
                        className="offer__map map">
                        <Map city={city} points={points} />
                    </section>
                </section>

                <div className="container">
                    <section className="near-places places">
                        <h2 className="near-places__title">Other places in the neighbourhood</h2>
                        <NearPlacesCardList offersList={nearOffersList} />
                    </section>
                </div>
            </main>
        </div >
    );
}

export { OfferPage };
