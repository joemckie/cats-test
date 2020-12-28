import { Reducer } from 'react';

export interface ImageVote {
  value: number;
  image_id: string;
  id: string;
}

export type NormalisedVotes = {
  [key: string]: number;
};

interface VotesReducerState {
  normalisedVotes: NormalisedVotes;
}

type VotesActionType = 'SET_VOTES' | 'VOTE';

export interface VotesReducerAction {
  type: VotesActionType;
  payload: any;
}

export const votesInitialState: VotesReducerState = {
  normalisedVotes: {},
};

export const votesReducer: Reducer<VotesReducerState, VotesReducerAction> = (state, action) => {
  switch (action.type) {
    case 'SET_VOTES': {
      // Convert vote list to a hash map for O(1) data access
      const normalisedVotes = action.payload.reduce(
        (acc: NormalisedVotes, vote: ImageVote) => ({
          ...acc,
          [vote.image_id]: (acc[vote.image_id] ?? 0) + vote.value,
        }), {},
      );

      return {
        ...state,
        normalisedVotes,
      };
    }
    case 'VOTE': {
      const { imageId, value } = action.payload;

      return {
        ...state,
        normalisedVotes: {
          ...state.normalisedVotes,
          [imageId]: (state.normalisedVotes[imageId] ?? 0) + value,
        },
      };
    }
    default: return state;
  }
};
