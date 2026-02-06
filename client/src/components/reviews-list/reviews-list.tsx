import { Review } from "../../types/reviews";
import ReviewItem from "../review-item/review-item";

type ReviewsListProps = {
    reviews: Review[];
}

function ReviewsList({ reviews }: ReviewsListProps) {
    return (
        <>
            <h2 className="reviews__title">
                Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
            </h2>
            <ul className="reviews__list">
                {reviews.map((review) => {
                    const reviewDate = new Date(review.date);
                    const formattedDate = reviewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

                    return (
                        <ReviewItem
                            key={review.id}
                            avatarSrc={review.user.avatarUrl}
                            userName={review.user.name}
                            rating={review.rating}
                            text={review.comment}
                            date={formattedDate}
                            dateTime={review.date}
                        />
                    );
                })}
            </ul>
        </>
    )
}

export { ReviewsList };