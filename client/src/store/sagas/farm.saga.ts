import { put, call, takeEvery } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  FETCH_ALL_FARMS,
  SET_ALL_FARMS,
  UPDATE_FARM,
  ADD_FARM,
  DELETE_FARM
} from '../../constants/common-constant';
import {
  createFarmApi,
  deleteFarmApi,
  fetchAllFarmsApi,
  updateFarmApi
} from '../../apis/farm.api';

export function* fetchAllFarms({
  payload
}: {
  type: typeof FETCH_ALL_FARMS;
  payload?: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchAllFarmsApi, payload);
    if (response?.data) {
      yield put({
        type: SET_ALL_FARMS,
        payload: response?.data
      });
    } else {
      yield put({
        type: SET_ALL_FARMS,
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

export function* createFarm({
  payload
}: {
  type: typeof ADD_FARM;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newFarm = yield call(createFarmApi, payload);

    if (newFarm.data) {
      yield put({ type: FETCH_ALL_FARMS });
    }
    const message = 'Farm successfully added';
    yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  } catch (error) {
    const message = error?.response?.data?.message?.includes('E11000')
      ? 'Duplicate category name'
      : error?.response?.data?.message || 'Farm adding failed';

    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* updateFarm({
  payload
}: {
  type: typeof UPDATE_FARM;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(updateFarmApi, payload);
    if (response.data) {
      const message = 'Farm successfully updated';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
      yield put({ type: FETCH_ALL_FARMS });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Farm updating failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* deleteFarm({
  payload
}: {
  type: typeof DELETE_FARM;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    yield call(deleteFarmApi, payload);

    const message = 'Farm deleted successfully';
    yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    yield put({ type: FETCH_ALL_FARMS });

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Farm deleting failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

function* farmSaga() {
  yield takeEvery(FETCH_ALL_FARMS, fetchAllFarms);
  yield takeEvery(UPDATE_FARM, updateFarm);
  yield takeEvery(ADD_FARM, createFarm);
  yield takeEvery(DELETE_FARM, deleteFarm);
}

export default farmSaga;
