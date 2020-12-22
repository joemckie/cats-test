import React, { useEffect, useState } from 'react';
import { Page } from '../../components/Page/Page';
import { apiSettings } from '../../config/api';
import { UploadedImageList } from './components/UploadedImageList/UploadedImageList';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);

      const queryParams = new URLSearchParams({
        limit: '100',
      });

      const response = await fetch(
        `${apiSettings.baseURL}/images?${queryParams}`,
        {
          headers: {
            'x-api-key': apiSettings.apiKey,
          },
        },
      );
      const data = await response.json();

      setImages(data);
      setIsLoading(false);
    }

    fetchImages();
  }, []);

  return (
    <Page>
      <h1>Uploaded images</h1>
      <UploadedImageList isLoading={isLoading} images={images} />
    </Page>
  );
};
