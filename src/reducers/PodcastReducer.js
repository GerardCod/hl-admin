import { FETCH_DOCUMENTS, LOADING, ERROR } from './Actions';

export const initialState = {
  loading: false,
  podcasts: null,
  error: null
}

const PodcastReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DOCUMENTS:
      return {
        ...state,
        loading: false,
        podcasts: action.payload,
        error: null
      }
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

export default PodcastReducer;