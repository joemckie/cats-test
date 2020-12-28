import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../../../config/routes';
import { FavouriteImage } from '../../../../reducers/favourites.reducer';
import { ReactComponent as Heart } from './assets/heart.svg';
import { ReactComponent as HeartEmpty } from './assets/heart-empty.svg';
import { ReactComponent as Arrow } from './assets/arrow.svg';
import { UploadedImage } from '../../../../reducers/images.reducer';
import { NormalisedVotes } from '../../../../reducers/votes.reducer';

export interface UploadedImageListProps {
  className?: string;
  images: UploadedImage[];
  favourites: FavouriteImage[];
  votes: NormalisedVotes;
  isLoading?: boolean;
  onFavourite: (imageId: string) => Promise<void>;
  onUnfavourite: (imageId: string) => Promise<void>;
  onVote: (imageId: string, value: 1 | -1) => Promise<void>;
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

const VotesContainer = styled.div`
  align-items: center;
  background: rgba(44, 62, 80, 0.5);
  color: #ecf0f1;
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 0.5rem;
`;

const VoteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  line-height: 1;
  padding: 0;
`;

const StyledArrow = styled(Arrow)`
  opacity: 0.75;
  transition: opacity 0.1s;

  &:hover {
    opacity: 1;
  }
`;

const DownVote = styled(StyledArrow)`
  fill: #8cb3d9;
`;

const UpVote = styled(StyledArrow)`
  fill: #ff4500;
  transform: rotate(180deg);
`;

export const UploadedImageList: React.FC<UploadedImageListProps> = ({
  className,
  images,
  favourites,
  votes,
  isLoading,
  onFavourite,
  onUnfavourite,
  onVote,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!images.length) {
    return (
      <p>
        No images uploaded. <Link to={Routes.Upload}>Click here</Link> to upload
        some!
      </p>
    );
  }

  return (
    <ImageGrid className={className}>
      {images.map((image) => {
        const isFavourite = favourites.some(
          (favourite) => favourite.image_id === image.id,
        );
        const onFavouriteClick = isFavourite ? onUnfavourite : onFavourite;

        return (
          <SingleImageContainer
            data-testid="cat-upload"
            key={image.id}
            imageURL={image.url}
          >
            <FavouriteButton
              data-testid="favourite-button"
              onClick={() => onFavouriteClick(image.id)}
            >
              {isFavourite ? (
                <Heart data-testid="favourited" />
              ) : (
                <HeartEmpty data-testid="not-favourited" />
              )}
            </FavouriteButton>
            <VotesContainer>
              <VoteButton
                data-testid="downvote-button"
                onClick={() => onVote(image.id, -1)}
              >
                <DownVote />
              </VoteButton>
              <span data-testid="votes-count">{votes[image.id] ?? 0}</span>
              <VoteButton
                data-testid="upvote-button"
                onClick={() => onVote(image.id, 1)}
              >
                <UpVote />
              </VoteButton>
            </VotesContainer>
          </SingleImageContainer>
        );
      })}
    </ImageGrid>
  );
};
