import React from 'react';

type ReviewItemProps = {
    avatarSrc: string;
    userName: string;
    rating: number;
    text: string;
    date: string;
    dateTime: string;
};

function ReviewItem({ avatarSrc, userName, rating, text, date, dateTime }: ReviewItemProps) {
    const ratingPercent = Math.round(rating * 20);

    return (
        <li className="reviews__item">
            <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img
                        className="reviews__avatar user__avatar"
                        src={avatarSrc}
                        width="54"
                        height="54"
                        alt="Reviews avatar"
                    />
                </div>
                <span className="reviews__user-name">
                    {userName}
                </span>
            </div>
            <div className="reviews__info">
                <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                        <span style={{ width: `${ratingPercent}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <p className="reviews__text">
                    {text}
                </p>
                <time className="reviews__time" dateTime={dateTime}>
                    {date}
                </time>
            </div>
        </li>
    );
}

export default ReviewItem;