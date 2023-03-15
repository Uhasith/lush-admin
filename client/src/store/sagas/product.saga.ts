import { put, call, takeEvery, all } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  FETCH_ALL_PRODUCTS,
  SET_ALL_PRODUCTS,
  UPDATE_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_UPDATED_PRODUCT
} from '../../constants/common-constant';
import {
  createProductApi,
  deleteProductApi,
  fetchAllProductsApi,
  updateProductApi
} from '../../apis/product.api';

export function* fetchAllProducts({
  payload
}: {
  type: typeof FETCH_ALL_PRODUCTS;
  payload?: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchAllProductsApi, payload);
    if (response?.data) {
      yield put({
        type: SET_ALL_PRODUCTS,
        payload: response?.data
      });
    } else {
      yield put({
        type: SET_ALL_PRODUCTS,
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

export function* createProduct({
  payload
}: {
  type: typeof ADD_PRODUCT;
  payload: any[];
}): any {
  try {
    yield put({ type: START_LOADING });

    const newProduct = yield call(createProductApi, payload);

    if (newProduct.status === 201) {
      const filters = { sorted: 'desc' };
      yield put({ type: FETCH_ALL_PRODUCTS, payload: filters });
    }
    const message = 'Product successfully added';
    yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  } catch (error) {
    const message = error?.response?.data?.message || 'Product adding failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* updateProduct({
  payload
}: {
  type: typeof UPDATE_PRODUCT;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(updateProductApi, payload);
    if (response.data) {
      const message = 'Product successfully updated';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
      yield put({ type: SET_UPDATED_PRODUCT, payload: response.data });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Product updating failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* deleteProduct({
  payload
}: {
  type: typeof DELETE_PRODUCT;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    yield call(deleteProductApi, payload);
    const filters = { sorted: 'desc' };
    const message = 'Product deleted successfully';
    yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    yield put({ type: FETCH_ALL_PRODUCTS, payload: filters });

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Product deleting failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

function* productSaga() {
  yield takeEvery(FETCH_ALL_PRODUCTS, fetchAllProducts);
  yield takeEvery(UPDATE_PRODUCT, updateProduct);
  yield takeEvery(ADD_PRODUCT, createProduct);
  yield takeEvery(DELETE_PRODUCT, deleteProduct);
}

export default productSaga;
