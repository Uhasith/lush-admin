import { request } from '../common/request';

export const fetchAllFarmsApi = async (filters?: any) => {
  try {
    let query = `/farms`;
    if (filters) {
      const { sorted } = filters;
      if (sorted) {
        query = query + `?sortBy=createdAt:${sorted}`;
      }
    }

    const response = await request('GET', query);

    return response;
  } catch (error) {
    throw error;
  }
};

export const createFarmApi = async (payload: any) => {
  try {
    const response = await request('POST', `/farms`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateFarmApi = async ({ id, data }: any) => {
  try {
    const response = await request('PATCH', `/farms/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFarmApi = async (farm: any) => {
  try {
    const response = await request('DELETE', `/farms/${farm}`);
    return response;
  } catch (error) {
    throw error;
  }
};
