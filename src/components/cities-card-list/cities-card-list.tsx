import { OffersList } from "../../types/offer"
import { PlaceCard } from "../place-card/place-card";

type CitiesCardListProps = {
    offersList: OffersList[]
}

function CitiesCardList({ offersList }: CitiesCardListProps) {
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
        />
      ))}
    </div>
  );
}

export { CitiesCardList };
