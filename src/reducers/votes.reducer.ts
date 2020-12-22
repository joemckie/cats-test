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
  votes: NormalisedVotes;
}

type VotesActionType = 'SET_VOTES' | 'VOTE';

interface VotesReducerAction {
  type: VotesActionType;
  payload: any;
}

export const votesInitialState: VotesReducerState = {
  votes: {},
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
        votes: normalisedVotes,
      };
    }
    case 'VOTE': {
      const { imageId, value } = action.payload;

      return {
        ...state,
        votes: {
          ...state.votes,
          [imageId]: (state.votes[imageId] ?? 0) + value,
        },
      };
    }
    default: throw new Error();
  }
};
