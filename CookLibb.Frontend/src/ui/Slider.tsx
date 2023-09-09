// SliderComponent.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';

const SliderContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 15rem; // You can adjust the height as needed
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  border-radius: 50%;

  outline: none;
  fill: #fff;
  transition: background 0.3s ease;
`;

const LeftSliderButton = styled(SliderButton)`
  left: 0;
  z-index: 100;
  margin-left: 0.5rem;
`;

const LeftIcon = styled(BsFillArrowLeftCircleFill)`
  width: 2rem;
  height: 2rem;
`;

const RightIcon = styled(BsFillArrowRightCircleFill)`
  width: 2rem;
  height: 2rem;
`;

const RightSliderButton = styled(SliderButton)`
  right: 0;
  z-index: 100;
  margin-right: 0.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface SliderProps {
  images: string[];
}

const SliderComponent: React.FC<SliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <SliderContainer>
      <LeftSliderButton onClick={handlePrevClick}>
        <LeftIcon />
      </LeftSliderButton>
      <Image src={images[currentImageIndex]} alt='Recipe' />
      <RightSliderButton onClick={handleNextClick}>
        <RightIcon />
      </RightSliderButton>
    </SliderContainer>
  );
};

export default SliderComponent;
