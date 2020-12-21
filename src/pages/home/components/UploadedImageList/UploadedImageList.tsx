import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Routes } from '../../../../config/routes';

export interface UploadedImage {
  imageURL: string;
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

const SingleImage = styled.div` 
  height: 264px;
`;

export const UploadedImageList: React.FC<UploadedImageListProps> = ({
  className,
  images,
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
      images.map((image) => (
        <SingleImage>
          <img alt="Uploaded cat" src={image.imageURL} />
        </SingleImage>
      ))
    }
    </ImageGrid>
  );
};
