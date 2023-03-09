import { SET_ALL_PRODUCTS } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const productReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return {
        ...state,
        list: action.payload.results
      };

    default:
      return state;
  }
};

export default productReducer;
