import React, { useState } from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import PaintingCard from '../components/PaintingCard';
import './Saved.css'; // Import the CSS file

const Saved = ({ savedPaintings }) => {
  const [selectedPainting, setSelectedPainting] = useState(null);

  const handleThumbnailClick = (painting) => {
    setSelectedPainting(painting);
  };

  const handleCardClick = () => {
    setSelectedPainting(null);
  };

  return (
    <div className="saved-container">
      {selectedPainting ? (
        <div onClick={handleCardClick}>
          <PaintingCard painting={selectedPainting} onSwipe={() => {}} />
        </div>
      ) : (
        <Box className="thumbnails-container">
          {savedPaintings.map((painting) => (
            <Card
              key={painting.id}
              className="thumbnail"
              onClick={() => handleThumbnailClick(painting)}
            >
              <CardMedia
                component="img"
                image={painting._links.image.href.replace('{image_version}', 'square')}
                alt={painting.title}
              />
              <Typography variant="body2" color="text.secondary">
                {painting.title}
              </Typography>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Saved;