import { SET_ALL_CATEGORIES } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const categoryReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return {
        ...state,
        list: action.payload.results
      };

    default:
      return state;
  }
};

export default categoryReducer;
