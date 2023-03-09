import { put, call, takeEvery } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  FETCH_ALL_CATEGORIES,
  SET_ALL_CATEGORIES,
  UPDATE_CATEGORY,
  ADD_CATEGORY,
  DELETE_CATEGORY
} from '../../constants/common-constant';
import {
  createCategoryApi,
  deleteategoryApi,
  fetchAllCategoriesApi,
  updateCategoryApi
} from '../../apis/category.api';

export function* fetchAllCategories({
  payload
}: {
  type: typeof FETCH_ALL_CATEGORIES;
  payload?: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchAllCategoriesApi, payload);
    if (response?.data) {
      yield put({
        type: SET_ALL_CATEGORIES,
        payload: response?.data
      });
    } else {
      yield put({
        type: SET_ALL_CATEGORIES,
        payload: []
      });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* createCategory({
  payload
}: {
  type: typeof ADD_CATEGORY;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newCategory = yield call(createCategoryApi, payload);

    if (newCategory.data) {
      yield put({ type: FETCH_ALL_CATEGORIES });
    }
    const message = 'Category successfully added';
    yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  } catch (error) {
    const message = error?.response?.data?.message?.includes('E11000')
      ? 'Duplicate category name'
      : error?.response?.data?.message || 'Category adding failed';

    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* updateCategory({
  payload
}: {
  type: typeof UPDATE_CATEGORY;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(updateCategoryApi, payload);
    if (response.data) {
      const message = 'Category successfully updated';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
      yield put({ type: FETCH_ALL_CATEGORIES });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Category updating failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* deleteCategory({
  payload
}: {
  type: typeof DELETE_CATEGORY;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    yield call(deleteategoryApi, payload);

    const message = 'Category deleted successfully';
    yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    yield put({ type: FETCH_ALL_CATEGORIES });

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Category deleting failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

function* categorySaga() {
  yield takeEvery(FETCH_ALL_CATEGORIES, fetchAllCategories);
  yield takeEvery(UPDATE_CATEGORY, updateCategory);
  yield takeEvery(ADD_CATEGORY, createCategory);
  yield takeEvery(DELETE_CATEGORY, deleteCategory);
}

export default categorySaga;
