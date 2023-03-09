import {
  ADD_PRODUCT,
  FETCH_ALL_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../../constants/common-constant';

export const fetchAllProducts = (payload?: any) => ({
  type: FETCH_ALL_PRODUCTS,
  payload
});

export const createProduct = (payload: any[]) => ({
  type: ADD_PRODUCT,
  payload: payload
});

export const updateProduct = (payload: any) => ({
  type: UPDATE_PRODUCT,
  payload: payload
});

export const deleteProduct = (payload: any) => ({
  type: DELETE_PRODUCT,
  payload: payload
});
