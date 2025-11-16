import { OffersList } from "../types/offer";

const offersList: OffersList[] = [
  {
    id: 'apt-001',
    title: 'Wood and Stone Place',
    type: 'apartment',
    price: 370,
    city: {
      name: 'Paris',
      location: { latitude: 48.8561, longitude: 2.351499, zoom: 13 }
    },
    location: { latitude: 48.8568, longitude: 2.342499, zoom: 16 },
    isFavorite: true,
    isPremium: false,
    rating: 4.9,
    previewImage: '/img/apartment-01.jpg'
  },

  {
    id: 'apt-002',
    title: 'Bright Canal Loft',
    type: 'room',
    price: 215,
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.3702, longitude: 4.8952, zoom: 12 }
    },
    location: { latitude: 52.3695, longitude: 4.8974, zoom: 15 },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    previewImage: './public/img/apartment-02.jpg'
  },

  {
    id: 'apt-003',
    title: 'Cozy Old Town Studio',
    type: 'studio',
    price: 150,
    city: {
      name: 'Brussels',
      location: { latitude: 50.8503, longitude: 4.3517, zoom: 12 }
    },
    location: { latitude: 50.8498, longitude: 4.3542, zoom: 15 },
    isFavorite: true,
    isPremium: false,
    rating: 4.4,
    previewImage: './public/img/apartment-03.jpg'
  },

  {
    id: 'apt-004',
    title: 'Harbor View Apartment',
    type: 'apartment',
    price: 290,
    city: {
      name: 'Hamburg',
      location: { latitude: 53.5511, longitude: 9.9937, zoom: 12 }
    },
    location: { latitude: 53.5522, longitude: 9.9954, zoom: 15 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: './public/img/apartment-01.jpg'
  }
];

export { offersList };
