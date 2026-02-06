import { OffersList } from "../../types/offer"
import { PlaceCard } from "../place-card/place-card";

type NearPlacesCardListProps = {
    offersList: OffersList[]
}

function NearPlacesCardList({ offersList }: NearPlacesCardListProps) {
  return (
    <div className="near-places__list places__list">
      {offersList.map((offer) => (
        <PlaceCard
          key={offer.id}
          {...offer}
          cardClassName="near-places__card"
          imgWrapperClass="near-places__image-wrapper"
          imgWidth={260}
          imgHeight={200}
        />
      ))}
    </div>
  );
}

export { NearPlacesCardList };
