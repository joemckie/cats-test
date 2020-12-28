import React, { Reducer, useReducer } from 'react';
import {
  favouritesInitialState,
  favouritesReducer,
  FavouritesReducerAction,
} from './reducers/favourites.reducer';
import {
  imagesInitialState,
  imagesReducer,
  ImagesReducerAction,
} from './reducers/images.reducer';
import {
  votesInitialState,
  votesReducer,
  VotesReducerAction,
} from './reducers/votes.reducer';

const initialState = {
  favourites: favouritesInitialState,
  images: imagesInitialState,
  votes: votesInitialState,
};

const combineReducers = (slices: Record<string, Reducer<any, any>>) => (
  prevState: any,
  action: any,
) =>
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action),
    }),
    prevState,
  );

type Action =
  | VotesReducerAction
  | FavouritesReducerAction
  | ImagesReducerAction;

interface StoreContext {
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}

export const store = React.createContext<StoreContext>({
  state: initialState,
  dispatch: () => {},
});

export const StoreProvider: React.FC = ({ children }) => {
  const combinedReducers = combineReducers({
    favourites: favouritesReducer,
    images: imagesReducer,
    votes: votesReducer,
  });

  const [state, dispatch] = useReducer(combinedReducers, initialState);

  return (
    <store.Provider value={{ state, dispatch }}>{children}</store.Provider>
  );
};
