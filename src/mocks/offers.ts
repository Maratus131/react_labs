import { FullOffer } from "../types/offer";

const offers: FullOffer[] = [
    {
        id: 'apt-001',
        title: 'Wood and Stone Place',
        description:
            'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families.',
        type: 'apartment',
        price: 370,
        images: ['/img/apartment-01.jpg', '/img/apartment-01.jpg', '/img/apartment-01.jpg', '/img/apartment-01.jpg', '/img/apartment-01.jpg', '/img/apartment-01.jpg'],
        city: {
            name: 'Paris',
            location: { latitude: 48.8561, longitude: 2.351499, zoom: 13 }
        },
        location: { latitude: 48.8568, longitude: 2.342499, zoom: 16 },
        goods: [
            'Heating',
            'Wi-Fi',
            'Fridge',
            'Laptop friendly workspace',
            'Baby seat',
            'Air conditioning',
            'Washer',
            'Towels',
            'Dishwasher',
            'Kitchen',
            'Washing machine',
            'Breakfast',
            'Coffee machine'
        ],
        host: { isPro: true, name: 'Marat', avatarUrl: '/img/avatar.svg' },
        isPremium: false,
        isFavorite: true,
        rating: 4.9,
        bedrooms: 2,
        maxAdults: 3
    },

    {
        id: 'apt-002',
        title: 'Bright Canal Loft',
        description:
            'Stylish loft with panoramic canal view. Close to museums, shops and cozy cafes.',
        type: 'room',
        price: 215,
        images: ['canal1.jpg', 'canal2.jpg', 'canal3.jpg'],
        city: {
            name: 'Amsterdam',
            location: { latitude: 52.3702, longitude: 4.8952, zoom: 12 }
        },
        location: { latitude: 52.3695, longitude: 4.8974, zoom: 15 },
        goods: [
            'Wi-Fi',
            'Kitchen',
            'Heating',
            'Towels',
            'Coffee machine',
            'Laptop friendly workspace'
        ],
        host: { isPro: false, name: 'Eva', avatarUrl: 'avatar-eva.jpg' },
        isPremium: true,
        isFavorite: false,
        rating: 4.7,
        bedrooms: 1,
        maxAdults: 2
    },

    {
        id: 'apt-003',
        title: 'Cozy Old Town Studio',
        description:
            'Compact and quiet studio located in the historic center. Perfect for solo travelers.',
        type: 'studio',
        price: 150,
        images: ['brussel1.jpg', 'brussel2.jpg'],
        city: {
            name: 'Brussels',
            location: { latitude: 50.8503, longitude: 4.3517, zoom: 12 }
        },
        location: { latitude: 50.8498, longitude: 4.3542, zoom: 15 },
        goods: [
            'Wi-Fi',
            'Heating',
            'Kitchen',
            'Towels',
            'Coffee machine'
        ],
        host: { isPro: false, name: 'Jonas', avatarUrl: 'avatar-jonas.jpg' },
        isPremium: false,
        isFavorite: true,
        rating: 4.4,
        bedrooms: 1,
        maxAdults: 1
    },

    {
        id: 'apt-004',
        title: 'Harbor View Apartment',
        description:
            'Modern apartment overlooking the harbor. Quiet area with fresh air and walking routes.',
        type: 'apartment',
        price: 290,
        images: ['hamburg1.jpg', 'hamburg2.jpg', 'hamburg3.jpg'],
        city: {
            name: 'Hamburg',
            location: { latitude: 53.5511, longitude: 9.9937, zoom: 12 }
        },
        location: { latitude: 53.5522, longitude: 9.9954, zoom: 15 },
        goods: [
            'Wi-Fi',
            'Heating',
            'Washer',
            'Dishwasher',
            'Kitchen',
            'Air conditioning'
        ],
        host: { isPro: true, name: 'Lara', avatarUrl: 'avatar-lara.jpg' },
        isPremium: true,
        isFavorite: false,
        rating: 4.8,
        bedrooms: 2,
        maxAdults: 4
    }
]

export { offers };