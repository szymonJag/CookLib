// SliderComponent.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';

const SliderContainer = styled.div<{ height: string; width: string }>`
  overflow: hidden;
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid var(--color-grey-300);
  cursor: pointer;
  border-radius: 50%;

  outline: none;
  fill: var(--color-grey-300);
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

const Image = styled.img<{ height: string; width: string }>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  object-fit: cover;
`;

interface SliderProps {
  images: string[];
  height?: string;
  width?: string;
}

const SliderComponent: React.FC<SliderProps> = ({ images, height, width }) => {
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
    <SliderContainer height={height || '10rem'} width={width || '100%'}>
      <LeftSliderButton onClick={handlePrevClick}>
        <LeftIcon />
      </LeftSliderButton>
      <Image
        src={images[currentImageIndex]}
        alt='Recipe'
        height={height || '10rem'}
        width={width || '100%'}
      />
      <RightSliderButton onClick={handleNextClick}>
        <RightIcon />
      </RightSliderButton>
    </SliderContainer>
  );
};

export default SliderComponent;
