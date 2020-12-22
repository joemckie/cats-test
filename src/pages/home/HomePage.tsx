import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import { Page } from '../../components/Page/Page';
import { apiSettings } from '../../config/api';
import { favouritesInitialState, favouritesReducer } from '../../reducers/favourites.reducer';
import { imagesInitialState, imagesReducer } from '../../reducers/images.reducer';
import { votesInitialState, votesReducer } from '../../reducers/votes.reducer';
import { apiRequest } from '../../utils/apiRequest';
import { UploadedImageList } from './components/UploadedImageList/UploadedImageList';

export const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [{ favourites }, dispatchFavourites] = useReducer(
    favouritesReducer,
    favouritesInitialState,
  );
  const [{ images }, dispatchImages] = useReducer(imagesReducer, imagesInitialState);
  const [{ votes }, dispatchVotes] = useReducer(votesReducer, votesInitialState);

  useEffect(() => {
    async function fetchPageData() {
      const imagesData = await apiRequest(
        `${apiSettings.baseURL}/images?limit=100`,
      );

      const favouritesData = await apiRequest(
        `${apiSettings.baseURL}/favourites?limit=100`,
      );

      const votesData = await apiRequest(
        `${apiSettings.baseURL}/votes?limit=100`,
      );

      dispatchImages({
        type: 'SET_IMAGES',
        payload: imagesData,
      });

      dispatchFavourites({
        type: 'SET_FAVOURITES',
        payload: favouritesData,
      });

      dispatchVotes({
        type: 'SET_VOTES',
        payload: votesData,
      });

      setIsLoading(false);
    }

    fetchPageData();
  }, []);

  const onFavouriteImage = useCallback(async (imageId) => {
    const favourite = await apiRequest(`${apiSettings.baseURL}/favourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_id: imageId,
      }),
    });

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

    const response = await apiRequest(
      `${apiSettings.baseURL}/favourites/${favourite.id}`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          image_id: imageId,
        }),
      },
    );

    if (response.message === 'SUCCESS') {
      dispatchFavourites({
        type: 'REMOVE_FAVOURITE',
        payload: {
          id: favourite.id,
        },
      });
    }
  }, [favourites]);

  const onVote = useCallback(async (imageId: string, value: 1 | -1) => {
    await apiRequest(
      `${apiSettings.baseURL}/votes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_id: imageId,
          value,
        }),
      },
    );

    dispatchVotes({
      type: 'VOTE',
      payload: {
        imageId,
        value,
      },
    });
  }, []);

  return (
    <Page>
      <h1>Uploaded images</h1>
      <UploadedImageList
        isLoading={isLoading}
        images={images}
        favourites={favourites}
        votes={votes}
        onFavourite={onFavouriteImage}
        onUnfavourite={onUnfavouriteImage}
        onVote={onVote}
      />
    </Page>
  );
};
