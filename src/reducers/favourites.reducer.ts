import { Reducer } from 'react';

export interface FavouriteImage {
  id: string;
  image_id: string;
}

export interface FavouriteReducerState {
  allFavourites: FavouriteImage[];
}

type FavouritesActionType =
  | 'SET_FAVOURITES'
  | 'ADD_FAVOURITE'
  | 'REMOVE_FAVOURITE';

export interface FavouritesReducerAction {
  type: FavouritesActionType;
  payload: any;
}

export const favouritesInitialState: FavouriteReducerState = {
  allFavourites: [],
};

export const favouritesReducer: Reducer<
  FavouriteReducerState,
  FavouritesReducerAction
> = (state, action): FavouriteReducerState => {
  switch (action.type) {
    case 'SET_FAVOURITES':
      return {
        ...state,
        allFavourites: action.payload,
      };
    case 'ADD_FAVOURITE':
      return {
        ...state,
        allFavourites: state.allFavourites.concat(action.payload),
      };
    case 'REMOVE_FAVOURITE': {
      const index = state.allFavourites.findIndex(
        ({ id }) => id === action.payload.id,
      );

      return {
        ...state,
        allFavourites: [
          ...state.allFavourites.slice(0, index),
          ...state.allFavourites.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
};
