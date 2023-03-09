import {
  ADD_CATEGORY,
  FETCH_ALL_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from '../../constants/common-constant';

export const fetchAllCategories = (payload?: any) => ({
  type: FETCH_ALL_CATEGORIES,
  payload
});

export const createCategory = (payload: any) => ({
  type: ADD_CATEGORY,
  payload: payload
});

export const updateCategory = (payload: any) => ({
  type: UPDATE_CATEGORY,
  payload: payload
});

export const deleteCategory = (payload: any) => ({
  type: DELETE_CATEGORY,
  payload: payload
});
