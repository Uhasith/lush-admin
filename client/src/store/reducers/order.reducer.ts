import { SET_ALL_ORDERS,SET_UPDATED_ORDER } from '../../constants/common-constant';

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
      case SET_UPDATED_ORDER:
        const updatedOrder = action.payload;
        const updatedList = state.list.map(order =>
          order.id === updatedOrder.id ? updatedOrder : order);
        
        return {
          ...state,
          list: updatedList
        };

    default:
      return state;
  }
};

export default orderReducer;
