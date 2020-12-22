import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import { useToasts } from 'react-toast-notifications';
import { Page } from '../../components/Page/Page';
import { apiSettings } from '../../config/api';
import { favouritesInitialState, favouritesReducer } from '../../reducers/favourites.reducer';
import { imagesInitialState, imagesReducer } from '../../reducers/images.reducer';
import { votesInitialState, votesReducer } from '../../reducers/votes.reducer';
import { apiRequest } from '../../utils/apiRequest';
import { UploadedImageList } from './components/UploadedImageList/UploadedImageList';

export const HomePage: React.FC = () => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(true);
  const [{ favourites }, dispatchFavourites] = useReducer(
    favouritesReducer,
    favouritesInitialState,
  );
  const [{ images }, dispatchImages] = useReducer(imagesReducer, imagesInitialState);
  const [{ votes }, dispatchVotes] = useReducer(votesReducer, votesInitialState);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const imagesResponse = await apiRequest(
          `${apiSettings.baseURL}/images?limit=100`,
        );
        const favouritesResponse = await apiRequest(
          `${apiSettings.baseURL}/favourites?limit=100`,
        );
        const votesResponse = await apiRequest(
          `${apiSettings.baseURL}/votes?limit=100`,
        );

        const favouritesData = await favouritesResponse.json();
        const imagesData = await imagesResponse.json();
        const votesData = await votesResponse.json();

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
      } catch (e) {
        addToast('Error loading page data', { appearance: 'error' });
      }
    }

    fetchPageData();
  }, [addToast]);

  const onFavouriteImage = useCallback(async (imageId) => {
    try {
      const response = await apiRequest(`${apiSettings.baseURL}/favourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    } catch (e) {
      addToast('Unable to favourite image', {
        appearance: 'error',
      });
    }
  }, [addToast]);

  const onUnfavouriteImage = useCallback(async (imageId) => {
    try {
      const favourite = favourites.find(({ image_id }) => image_id === imageId);

      if (!favourite) {
        throw new Error('Favourite could not be found');
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

      const data = await response.json();

      if (data.message === 'SUCCESS') {
        dispatchFavourites({
          type: 'REMOVE_FAVOURITE',
          payload: {
            id: favourite.id,
          },
        });
      }
    } catch (e) {
      addToast(e.message, {
        appearance: 'error',
      });
    }
  }, [favourites, addToast]);

  const onVote = useCallback(async (imageId: string, value: 1 | -1) => {
    const response = await apiRequest(
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

    if (response.ok) {
      const data = await response.json();

      if (data.message === 'SUCCESS') {
        dispatchVotes({
          type: 'VOTE',
          payload: {
            imageId,
            value,
          },
        });
      }
    } else {
      addToast('Unable to vote', {
        appearance: 'error',
      });
    }
  }, [addToast]);

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
