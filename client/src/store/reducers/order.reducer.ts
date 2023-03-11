import { SET_ALL_ORDERS } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const orderReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return {
        ...state,
        list: action.payload.results
      };

    default:
      return state;
  }
};

export default orderReducer;
