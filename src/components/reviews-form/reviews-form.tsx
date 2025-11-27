import React, { useState } from "react";
import { Review } from "../../types/reviews";


type ReviewsFormProps = {
    onAddReview: (review: Review) => void;
}

function ReviewsForm({ onAddReview }: ReviewsFormProps) {

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmitReview = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (rating === 0 || review.length > 50) return;

        const newReview: Review = {
            id: crypto.randomUUID(),
            rating,
            comment: review,
            date: new Date().toISOString(),
            user: {
                name: 'You',
                avatarUrl: "/img/avatar.svg",
                isPro: false
            }
        };
        onAddReview(newReview);

        setReview("");
        setRating(0);
    };

    return (
        <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitReview}>
            <svg width="0" height="0">
                <symbol id="icon-star" viewBox="0 0 13 12">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
                    />
                </symbol>
            </svg>
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
                            checked={rating === num}
                            onChange={() => setRating(num)}
                        />
                        <label
                            htmlFor={`${num}-stars`}
                            className="reviews__rating-label form__rating-label"
                            title="rating"
                        >
                            <svg className="form__star-image" width="37" height="33">
                                <use href="#icon-star"></use>
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
                value={review}
                onChange={(e) => setReview(e.target.value)}
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
                    disabled={rating === 0 || review.length > 50}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export { ReviewsForm };