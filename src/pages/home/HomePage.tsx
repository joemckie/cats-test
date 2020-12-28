import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { useToasts } from 'react-toast-notifications';
import { Page } from '../../components/Page/Page';
import { apiSettings } from '../../config/api';
import { store } from '../../store';
import { apiRequest } from '../../utils/apiRequest';
import { UploadedImageList } from './components/UploadedImageList/UploadedImageList';

export const HomePage: React.FC = () => {
  const { addToast } = useToasts();
  const {
    state: {
      favourites,
      images,
      votes,
    },
    dispatch,
  } = useContext(store);
  const [isLoading, setIsLoading] = useState(images.allImages.length === 0);

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

        dispatch({
          type: 'SET_IMAGES',
          payload: imagesData,
        });

        dispatch({
          type: 'SET_FAVOURITES',
          payload: favouritesData,
        });

        dispatch({
          type: 'SET_VOTES',
          payload: votesData,
        });

        setIsLoading(false);
      } catch (e) {
        addToast('Error loading page data', { appearance: 'error' });
      }
    }

    if (isLoading) {
      fetchPageData();
    }
  }, [addToast, dispatch, isLoading]);

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

      dispatch({
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
  }, [addToast, dispatch]);

  const onUnfavouriteImage = useCallback(async (imageId) => {
    try {
      const favourite = favourites.allFavourites.find(({ image_id }) => image_id === imageId);

      const response = await apiRequest(
        `${apiSettings.baseURL}/favourites/${favourite!.id}`,
        {
          method: 'DELETE',
          body: JSON.stringify({
            image_id: imageId,
          }),
        },
      );

      const data = await response.json();

      if (data.message === 'SUCCESS') {
        dispatch({
          type: 'REMOVE_FAVOURITE',
          payload: {
            id: favourite!.id,
          },
        });
      }
    } catch (e) {
      addToast(e.message, {
        appearance: 'error',
      });
    }
  }, [favourites, addToast, dispatch]);

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
        dispatch({
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
  }, [addToast, dispatch]);

  return (
    <Page>
      <h1>Uploaded images</h1>
      <UploadedImageList
        isLoading={isLoading}
        images={images.allImages}
        favourites={favourites.allFavourites}
        votes={votes.normalisedVotes}
        onFavourite={onFavouriteImage}
        onUnfavourite={onUnfavouriteImage}
        onVote={onVote}
      />
    </Page>
  );
};
