import { Reducer } from 'react';

export interface FavouriteImage {
  id: string;
  image_id: string;
}

interface FavouriteReducerState {
  favourites: FavouriteImage[];
}

type HomeActionType = 'SET_FAVOURITES' | 'ADD_FAVOURITE' | 'REMOVE_FAVOURITE';

interface HomeReducerAction {
  type: HomeActionType;
  payload: any;
}

export const favouritesInitialState: FavouriteReducerState = {
  favourites: [],
};

export const favouritesReducer: Reducer<FavouriteReducerState, HomeReducerAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'SET_FAVOURITES':
      return {
        ...state,
        favourites: action.payload,
      };
    case 'ADD_FAVOURITE':
      return {
        ...state,
        favourites: state.favourites.concat(action.payload),
      };
    case 'REMOVE_FAVOURITE': {
      const index = state.favourites.findIndex(({ id }) => id === action.payload.id);

      return {
        ...state,
        favourites: [
          ...state.favourites.slice(0, index),
          ...state.favourites.slice(index + 1),
        ],
      };
    }
    default: throw new Error();
  }
};
