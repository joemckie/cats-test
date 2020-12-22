import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../../../config/routes';
import { FavouriteImage } from '../../../../reducers/favourites.reducer';
import { ReactComponent as Heart } from './assets/heart.svg';
import { ReactComponent as HeartEmpty } from './assets/heart-empty.svg';
import { UploadedImage } from '../../../../reducers/images.reducer';

export interface UploadedImageListProps {
  className?: string;
  images: UploadedImage[];
  favourites: FavouriteImage[];
  isLoading?: boolean;
  onFavourite: (imageId: string) => Promise<void>;
  onUnfavourite: (imageId: string) => Promise<void>;
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
  favourites,
  onFavourite,
  onUnfavourite,
  isLoading = false,
}) => {
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
        images.map((image) => {
          // If we had lots of favourites we could speed this up
          // by normalising the favourites into a hash map
          const isFavourite = favourites.some((favourite) => favourite.image_id === image.id);
          const onFavouriteClick = isFavourite ? onUnfavourite : onFavourite;

          return (
            <SingleImageContainer key={image.id} imageURL={image.url}>
              <FavouriteButton onClick={() => onFavouriteClick(image.id)}>
                {
                  isFavourite
                    ? <Heart />
                    : <HeartEmpty />
                }
              </FavouriteButton>
            </SingleImageContainer>
          );
        })
      }
    </ImageGrid>
  );
};
