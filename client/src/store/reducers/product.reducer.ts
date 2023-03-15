import { SET_ALL_PRODUCTS, SET_UPDATED_PRODUCT } from '../../constants/common-constant';

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
    case SET_UPDATED_PRODUCT:
      const updatedProduct = action.payload;
      const updatedList = state.list.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product);
      
      return {
        ...state,
        list: updatedList
      };

    default:
      return state;
  }
};

export default productReducer;
