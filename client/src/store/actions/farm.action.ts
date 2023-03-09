import {
  ADD_FARM,
  FETCH_ALL_FARMS,
  UPDATE_FARM,
  DELETE_FARM
} from '../../constants/common-constant';

export const fetchAllFarms = (payload?: any) => ({
  type: FETCH_ALL_FARMS,
  payload
});

export const createFarm = (payload: any) => ({
  type: ADD_FARM,
  payload: payload
});

export const updateFarm = (payload: any) => ({
  type: UPDATE_FARM,
  payload: payload
});

export const deleteFarm = (payload: any) => ({
  type: DELETE_FARM,
  payload: payload
});
