import {
  ADD_ORDER,
  FETCH_ALL_ORDERS,
  UPDATE_ORDER,
} from '../../constants/common-constant';

export const fetchAllOrders = (payload?: any) => ({
  type: FETCH_ALL_ORDERS,
  payload
});

export const createOrder = (payload: any) => ({
  type: ADD_ORDER,
  payload: payload
});

export const updateOrder = (payload: any) => ({
  type: UPDATE_ORDER,
  payload: payload
});