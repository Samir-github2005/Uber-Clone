import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const accessToken = import.meta.env.VITE_MAPBOX_API;
mapboxgl.accessToken = accessToken;

const defaultLocation = { lng: 77.8880, lat: 29.8543 }; // Roorkee fallback

const LiveTracking = ({ userLocation }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [currentLoc, setCurrentLoc] = useState(
    userLocation?.lng && userLocation?.lat ? userLocation : defaultLocation
  );

  useEffect(() => {
    if (userLocation?.lng && userLocation?.lat) {
      setCurrentLoc(userLocation);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLoc({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        (err) => {
          console.warn('Geolocation error in LiveTracking:', err);
        }
      );
    }
  }, [userLocation]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const loc = currentLoc?.lng && currentLoc?.lat ? currentLoc : defaultLocation;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [loc.lng, loc.lat],
        zoom: 14,
      });

      markerRef.current = new mapboxgl.Marker({ color: '#276EF1' })
        .setLngLat([loc.lng, loc.lat])
        .addTo(mapRef.current);
    } else if (markerRef.current) {
      markerRef.current.setLngLat([loc.lng, loc.lat]);
      mapRef.current.flyTo({ center: [loc.lng, loc.lat], essential: true });
    }
  }, [currentLoc]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LiveTracking;
