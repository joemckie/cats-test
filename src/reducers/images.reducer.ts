import { Reducer } from 'react';

export interface UploadedImage {
  url: string;
  id: string;
  width: number;
}

interface ImagesReducerState {
  images: UploadedImage[];
}

type ImagesActionType = 'SET_IMAGES';

interface ImagesReducerAction {
  type: ImagesActionType;
  payload: any;
}

export const imagesInitialState: ImagesReducerState = {
  images: [],
};

export const imagesReducer: Reducer<ImagesReducerState, ImagesReducerAction> = (state, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return {
        ...state,
        images: action.payload,
      };
    default: throw new Error();
  }
};
