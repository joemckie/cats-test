import { Reducer } from 'react';

export interface UploadedImage {
  url: string;
  id: string;
  width: number;
}

interface ImagesReducerState {
  allImages: UploadedImage[];
}

type ImagesActionType = 'SET_IMAGES';

export interface ImagesReducerAction {
  type: ImagesActionType;
  payload: any;
}

export const imagesInitialState: ImagesReducerState = {
  allImages: [],
};

export const imagesReducer: Reducer<ImagesReducerState, ImagesReducerAction> = (state, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return {
        ...state,
        allImages: action.payload,
      };
    default: return state;
  }
};
