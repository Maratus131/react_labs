
import React, {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './useMap';

type City = {
	lat: number;
	lng: number;
	zoom: number;
};

type Point = {
	id: string;
	title: string;
	lat: number;
	lng: number;
};

type MapProps = {
	city: City;
	points: Point[];
	selectedPointId?: string;
};

function Map({city, points, selectedPointId}: MapProps): React.ReactElement {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const map = useMap(mapRef, city);

	const defaultIcon = leaflet.icon({
		iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
		shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		shadowSize: [41, 41],
	});

	const currentIcon = leaflet.icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
		shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
	});

	useEffect(() => {
		if (!map) {
			return;
		}

		const markersLayer = leaflet.layerGroup().addTo(map);

		points.forEach((p) => {
			leaflet
				.marker([p.lat, p.lng], {
					icon: (p.id === selectedPointId) ? currentIcon : defaultIcon,
				})
				.addTo(markersLayer);
		});

		return () => {
			markersLayer.clearLayers();
			try {
				map.removeLayer(markersLayer);
			} catch (err) {

			}
		};
	}, [map, points, selectedPointId]);

	return (
		<div
			ref={mapRef}
			style={{width: '100%', height: '500px'}}
		/>
	);
}

export default Map;
