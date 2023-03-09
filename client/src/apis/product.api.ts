import { request } from '../common/request';

export const fetchAllProductsApi = async (filters?: any) => {
  try {
    let query = `/products`;
    if (filters) {
      const { status, sorted, name } = filters;

      if (sorted) {
        query = query + `?sortBy=createdAt:${sorted}`;
      }
      if (name) {
        query = query + `&name=${name}`;
      }
      if (status && status !== 'All') {
        query = query + `&status=${status}`;
      }
    }

    const response = await request('GET', query);

    return response;
  } catch (error) {
    throw error;
  }
};

export const createProductApi = async (payload: any[]) => {
  try {
    const response = await request('POST', `/products`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProductApi = async ({ id, data }: any) => {
  try {
    const response = await request('PATCH', `/products/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProductApi = async (product: any) => {
  try {
    const response = await request('DELETE', `/products/${product}`);
    return response;
  } catch (error) {
    throw error;
  }
};
