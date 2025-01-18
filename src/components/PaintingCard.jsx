import React from 'react';
import TinderCard from 'react-tinder-card';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import './PaintingCard.css'; // Import the CSS file

const PaintingCard = ({ painting, onSwipe }) => {
  const handleLeftClick = () => {
    onSwipe('left', painting);
  };

  const handleRightClick = () => {
    onSwipe('right', painting);
  };

  return (
    <div className="card-container">
      <TinderCard
        onSwipe={(direction) => onSwipe(direction, painting)}
        preventSwipe={['up', 'down']}
      >
        <Card className="painting-card">
          <div className="clickable-area left" onClick={handleLeftClick}></div>
          <CardMedia
            component="img"
            image={painting._links.image.href.replace('{image_version}', 'large')}
            alt={painting.title}
          />
          <div className="clickable-area right" onClick={handleRightClick}></div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {painting.title}
            </Typography>
            {painting.artist && (
              <Typography variant="body2" color="text.secondary">
                {painting.artist.name}
              </Typography>
            )}
            {painting.date && (
              <Typography variant="body2" color="text.secondary">
                {painting.date}
              </Typography>
            )}
            {painting.medium && (
              <Typography variant="body2" color="text.secondary">
                {painting.medium}
              </Typography>
            )}
          </CardContent>
        </Card>
      </TinderCard>
    </div>
  );
};

export default PaintingCard;