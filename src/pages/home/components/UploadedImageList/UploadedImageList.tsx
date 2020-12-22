import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../../../config/routes';
// import heart from './assets/heart.svg';
import { ReactComponent as HeartEmpty } from './assets/heart-empty.svg';

export interface UploadedImage {
  url: string;
  id: string;
  width: number;
}

export interface UploadedImageListProps {
  className?: string;
  images: UploadedImage[];
  isLoading?: boolean;
}

const ImageGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
  grid-gap: 10px;
`;

interface SingleImageContainerProps {
  imageURL: string;
}

const SingleImageContainer = styled.div<SingleImageContainerProps>`
  align-items: flex-end;
  background-image: url(${({ imageURL }) => imageURL});
  background-size: cover;
  background-position: center;
  display: flex;
  height: 264px;
  position: relative;
`;

const FavouriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  fill: #e74c3c;
`;

export const UploadedImageList: React.FC<UploadedImageListProps> = ({
  className,
  images,
  isLoading = false,
}) => {
  const onFavourite = useCallback(() => {}, []);
  // const onUnfavourite = useCallback(() => {}, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!images.length) {
    return (
      <p>
        No images uploaded.
        {' '}
        <Link to={Routes.Upload}>Click here</Link>
        {' '}
        to upload some!
      </p>
    );
  }

  return (
    <ImageGrid className={className}>
      {
        images.map((image) => (
          <SingleImageContainer imageURL={image.url}>
            <FavouriteButton onClick={onFavourite}>
              <HeartEmpty />
            </FavouriteButton>
          </SingleImageContainer>
        ))
      }
    </ImageGrid>
  );
};
