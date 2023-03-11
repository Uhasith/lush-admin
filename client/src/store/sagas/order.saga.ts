import { put, call, takeEvery } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  FETCH_ALL_ORDERS,
  SET_ALL_ORDERS,
  UPDATE_ORDER,
  ADD_ORDER,
} from '../../constants/common-constant';
import {
  createOrderApi,
  fetchAllOrdersApi,
  updateOrderApi
} from '../../apis/order.api';

export function* fetchAllOrders({
  payload
}: {
  type: typeof FETCH_ALL_ORDERS;
  payload?: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchAllOrdersApi, payload);
    if (response?.data) {
      yield put({
        type: SET_ALL_ORDERS,
        payload: response?.data
      });
    } else {
      yield put({
        type: SET_ALL_ORDERS,
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

export function* createOrder({
  payload
}: {
  type: typeof ADD_ORDER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newOrder = yield call(createOrderApi, payload);

    if (newOrder.data) {
      yield put({ type: FETCH_ALL_ORDERS });
    }
    const message = 'Order successfully added';
    yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  } catch (error) {
    const message = error?.response?.data?.message?.includes('E11000')
      ? 'Duplicate order name'
      : error?.response?.data?.message || 'Order adding failed';

    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* updateOrder({
  payload
}: {
  type: typeof UPDATE_ORDER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(updateOrderApi, payload);
    if (response.data) {
      const message = 'Order successfully updated';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
      yield put({ type: FETCH_ALL_ORDERS });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Order updating failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}


function* farmSaga() {
  yield takeEvery(FETCH_ALL_ORDERS, fetchAllOrders);
  yield takeEvery(UPDATE_ORDER, updateOrder);
  yield takeEvery(ADD_ORDER, createOrder);
}

export default farmSaga;
