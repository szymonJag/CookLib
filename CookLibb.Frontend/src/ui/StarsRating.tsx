import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';

const StarsRatingLayout = styled.div`
  display: flex;
  gap: 2rem;
  cursor: pointer;
`;

const StarOutlineIcon = styled(AiOutlineStar)`
  height: 4rem;
  width: 4rem;
`;

const StarFillIcon = styled(AiFillStar)`
  height: 4rem;
  width: 4rem;
`;

interface StarsRatingProps {
  handleRatingClick: (rating: number) => void;
}

function StarsRating({ handleRatingClick }: StarsRatingProps) {
  const [rating, setRating] = useState(0);
  const [clicked, setClicked] = useState(0);

  const handleStarHover = (index: number) => {
    setRating(index + 1);
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
    setClicked(index + 1);
    console.log(`clicked`, clicked);
    handleRatingClick(rating);
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <div
        key={i}
        onMouseEnter={() => handleStarHover(i)}
        onMouseLeave={() => setRating(clicked)}
        onClick={() => handleStarClick(i)}
      >
        {i < rating ? <StarFillIcon /> : <StarOutlineIcon />}
      </div>
    );
  }

  return <StarsRatingLayout>{stars}</StarsRatingLayout>;
}

export default StarsRating;
