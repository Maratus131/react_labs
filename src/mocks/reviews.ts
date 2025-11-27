import { Review } from "../types/reviews";

const reviews: Review[] = [
    {
        'id': 'user-001',
        user: {
            name: "Max",
            avatarUrl: "/img/avatar-max.jpg",
            isPro: false
        },
        rating: 4,
        comment: "A quiet cozy and picturesque that hides behind a river.",
        date: "2019-04-24"
    },
    {
        'id': 'user-002',
        user: {
            name: "Angelina",
            avatarUrl: "/img/avatar-angelina.jpg",
            isPro: false
        },
        rating: 4,
        comment: "A quiet cozy and picturesque.",
        date: "2022-05-24"
    }
]

export { reviews };