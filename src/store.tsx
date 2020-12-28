import React, { useReducer } from 'react';
import { favouritesInitialState, favouritesReducer, FavouritesReducerAction } from './reducers/favourites.reducer';
import { imagesInitialState, imagesReducer, ImagesReducerAction } from './reducers/images.reducer';
import { votesInitialState, votesReducer, VotesReducerAction } from './reducers/votes.reducer';

// eslint-disable-next-line max-len
const combineReducers = (slices: any) => (prevState: any, action: any) => Object.keys(slices).reduce(
  (nextState, nextProp) => ({
    ...nextState,
    [nextProp]: slices[nextProp](prevState[nextProp], action),
  }),
  prevState,
);

const initialState = {
  favourites: favouritesInitialState,
  images: imagesInitialState,
  votes: votesInitialState,
};

type Action = VotesReducerAction | FavouritesReducerAction | ImagesReducerAction;

interface StoreContext {
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}

const store = React.createContext<StoreContext>({
  state: initialState,
  dispatch: () => {},
});

const StoreProvider: React.FC = ({ children }) => {
  const combinedReducers = combineReducers({
    favourites: favouritesReducer,
    images: imagesReducer,
    votes: votesReducer,
  });

  const [state, dispatch] = useReducer(combinedReducers, initialState);

  return (
    <store.Provider value={{ state, dispatch }}>
      {children}
    </store.Provider>
  );
};

export { store, StoreProvider };
