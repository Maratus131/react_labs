import { Logo } from "../logo/logo"
import { OffersList } from "../../types/offer"

type NearPlacesCardProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    rating: number;
}

function NearPlacesCard({ id, title, type, price,rating }: NearPlacesCardProps) {
    const ratingPercent = Math.round(rating * 20);

    return (
        <article className="near-places__card place-card">
            <div className="near-places__image-wrapper place-card__image-wrapper">
                <Logo />
            </div>
            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use href="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">In bookmarks</span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: `${ratingPercent}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <a href={`/offer/${id}`}>{title}</a>
                </h2>
                <p className="place-card__type">{type}</p>
            </div>
        </article>
    )
}

export { NearPlacesCard }