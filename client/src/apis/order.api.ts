import { request } from '../common/request';

export const fetchAllOrdersApi = async (filters?: any) => {
  try {
    let query = `/orders`;
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

export const createOrderApi = async (payload: any) => {
  try {
    const response = await request('POST', `/orders`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateOrderApi = async ({ id, data }: any) => {
  try {
    const response = await request('PATCH', `/orders/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};
