import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import './Map.css'; // Import the CSS file

const Map = ({ savedPaintings }) => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const mapContainerStyle = {
    width: '100%',
    height: '100vh'
  };

  const center = {
    lat: 0,
    lng: 0
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      const newMarkers = [];
      const institutionMap = {};

      for (const painting of savedPaintings) {
        const location = painting.collecting_institution;
        if (isValidLocation(location)) {
          if (!institutionMap[location]) {
            const coordinates = await getCoordinates(location);
            if (coordinates) {
              institutionMap[location] = {
                position: coordinates,
                institution: location,
                paintings: [painting.title]
              };
              console.log(`Geocoding response for ${location}:`, coordinates);
            }
          } else {
            institutionMap[location].paintings.push(painting.title);
          }
        } else {
          console.warn(`Invalid location string: "${location}"`);
        }
      }

      for (const key in institutionMap) {
        newMarkers.push(institutionMap[key]);
      }

      setMarkers(newMarkers);
    };

    fetchCoordinates();
  }, [savedPaintings]);

  const isValidLocation = (location) => {
    // Basic validation: check if the location string is non-empty
    return location && location.trim().length > 0;
  };

  const getCoordinates = async (location) => {
    try {
      console.log(`Fetching coordinates for location: ${location}`);
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }
      });
      console.log('Geocoding response:', response.data);
      const { results } = response.data;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        return { lat, lng };
      } else {
        console.warn(`No results found for location: ${location}`);
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
    return null;
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={2}>
        {markers.map((marker) => (
          <MarkerF 
            key={marker.institution} 
            position={marker.position} 
            onClick={() => handleMarkerClick(marker)} 
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h2>{selectedMarker.institution}</h2>
              <ul>
                {selectedMarker.paintings.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ul>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;