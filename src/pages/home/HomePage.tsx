import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import { Page } from '../../components/Page/Page';
import { apiSettings } from '../../config/api';
import { favouritesInitialState, favouritesReducer } from '../../reducers/favourites.reducer';
import { imagesInitialState, imagesReducer } from '../../reducers/images.reducer';
import { UploadedImageList } from './components/UploadedImageList/UploadedImageList';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [{ favourites }, dispatchFavourites] = useReducer(
    favouritesReducer,
    favouritesInitialState,
  );
  const [{ images }, dispatchImages] = useReducer(imagesReducer, imagesInitialState);

  const onFavouriteImage = useCallback(async (imageId) => {
    const response = await fetch(`${apiSettings.baseURL}/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiSettings.apiKey,
      },
      body: JSON.stringify({
        image_id: imageId,
      }),
    });

    const favourite = await response.json();

    dispatchFavourites({
      type: 'ADD_FAVOURITE',
      payload: {
        image_id: imageId,
        id: favourite.id,
      },
    });
  }, []);

  const onUnfavouriteImage = useCallback(async (imageId) => {
    const favourite = favourites.find(({ image_id }) => image_id === imageId);

    if (!favourite) {
      return;
    }

    const response = await fetch(
      `${apiSettings.baseURL}/favourites/${favourite.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiSettings.apiKey,
        },
        body: JSON.stringify({
          image_id: imageId,
        }),
      },
    );

    if (response.ok) {
      dispatchFavourites({
        type: 'REMOVE_FAVOURITE',
        payload: {
          id: favourite.id,
        },
      });
    }
  }, [favourites]);

  useEffect(() => {
    async function fetchPageData() {
      const imagesResponse = await fetch(
        `${apiSettings.baseURL}/images?limit=100`,
        {
          headers: {
            'x-api-key': apiSettings.apiKey,
          },
        },
      );

      const favouritesResponse = await fetch(
        `${apiSettings.baseURL}/favourites?limit=100`,
        {
          headers: {
            'x-api-key': apiSettings.apiKey,
          },
        },
      );

      const imagesData = await imagesResponse.json();
      const favouritesData = await favouritesResponse.json();

      dispatchImages({
        type: 'SET_IMAGES',
        payload: imagesData,
      });

      dispatchFavourites({
        type: 'SET_FAVOURITES',
        payload: favouritesData,
      });

      setIsLoading(false);
    }

    fetchPageData();
  }, []);

  return (
    <Page>
      <h1>Uploaded images</h1>
      <UploadedImageList
        isLoading={isLoading}
        images={images}
        favourites={favourites}
        onFavourite={onFavouriteImage}
        onUnfavourite={onUnfavouriteImage}
      />
    </Page>
  );
};
