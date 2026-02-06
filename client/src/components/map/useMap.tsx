import { useEffect, useState, useRef } from 'react';
import leaflet from 'leaflet';

type City = {
  lat: number;
  lng: number;
  zoom: number;
};

export default function useMap(mapRef: React.RefObject<HTMLDivElement | null>, city: City) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      // Инициализация карты (выполняется 1 раз)
      const instance = leaflet.map(mapRef.current, {
        center: [city.lat, city.lng],
        zoom: city.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    } else if (map) {
      // Обновление вьюпорта. 
      // Сработает ТОЛЬКО если координаты или дефолтный зум города реально изменились.
      map.setView([city.lat, city.lng], city.zoom);
    }
  }, [mapRef, map, city.lat, city.lng, city.zoom]); // <--- Изменили зависимости здесь!

  return map;
}