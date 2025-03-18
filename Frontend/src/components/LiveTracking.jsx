import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = import.meta.env.VITE_MAPBOX_API; // Ensure this is set in your environment variables
console.log('Access token:', accessToken);
mapboxgl.accessToken = accessToken;

const LiveTracking = ({ userLocation }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [userLocation.lng, userLocation.lat],
        zoom: 14,
      });

      markerRef.current = new mapboxgl.Marker()
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(mapRef.current);
    }
  }, [userLocation]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
      mapRef.current.flyTo({ center: [userLocation.lng, userLocation.lat], essential: true });
    }
  }, [userLocation]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default LiveTracking;
