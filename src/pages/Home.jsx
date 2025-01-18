import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaintingCard from '../components/PaintingCard';
import { Container, Box } from '@mui/material';
import getArtsyToken from '../utils/getArtsyToken';
import './Home.css'; // Import the CSS file

const Home = ({ savedPaintings, setSavedPaintings }) => {
  const [painting, setPainting] = useState(null);
  const [loadedPaintings, setLoadedPaintings] = useState([]);

  useEffect(() => {
    fetchPaintings();
  }, []);

  const fetchPaintings = async () => {
    try {
      const token = await getArtsyToken();
      console.log('Using Artsy token:', token); // Log the token
      const response = await axios.get('https://api.artsy.net/api/artworks?size=50', {
        headers: {
          'X-Xapp-Token': token
        }
      });
      console.log('Fetched paintings:', response.data); // Log the response
      const artworks = response.data._embedded.artworks.filter(
        (artwork) => !savedPaintings.some((saved) => saved.id === artwork.id)
      );
      setLoadedPaintings(artworks);
      fetchPainting(artworks);
    } catch (error) {
      console.error('Error fetching paintings:', error);
    }
  };

  const fetchPainting = (artworks = loadedPaintings) => {
    if (artworks.length > 0) {
      const randomIndex = Math.floor(Math.random() * artworks.length);
      setPainting(artworks[randomIndex]);
      setLoadedPaintings(artworks.filter((_, index) => index !== randomIndex));
    } else {
      fetchPaintings();
    }
  };

  const handleSwipe = (direction, painting) => {
    if (direction === 'right') {
      setSavedPaintings([...savedPaintings, painting]);
    }
    fetchPainting();
  };

  return (
    <div className="home-container">
      <Box className="card-box">
        {painting && (
          <PaintingCard key={painting.id} painting={painting} onSwipe={handleSwipe} />
        )}
      </Box>
    </div>
  );
};

export default Home;