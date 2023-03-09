import { SET_ALL_FARMS } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const farmReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_ALL_FARMS:
      return {
        ...state,
        list: action.payload.results
      };

    default:
      return state;
  }
};

export default farmReducer;
