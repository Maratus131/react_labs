import { OffersList } from "../../types/offer"
import { PlaceCard } from "../place-card/place-card";

type CitiesCardListProps = {
    offersList: OffersList[];
    onListItemHover: (offerId: string | undefined) => void;
}

function CitiesCardList({ offersList, onListItemHover }: CitiesCardListProps) {
    return (
        <div className="cities__places-list places__list tabs__content">
            {offersList.map((offer) => (
                <PlaceCard
                    key={offer.id}
                    {...offer}
                    cardClassName="cities__card"
                    imgWrapperClass="cities__image-wrapper"
                    imgWidth={260}
                    imgHeight={200}
                    onMouseEnter={() => onListItemHover(offer.id)}
                    onMouseLeave={() => onListItemHover(undefined)}
                />
            ))}
        </div>
    );
}

export { CitiesCardList };
