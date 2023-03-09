import { request } from '../common/request';

export const fetchAllCategoriesApi = async (filters?: any) => {
  try {
    let query = `/categories`;
    if (filters) {
      const { status, sorted } = filters;
      if (sorted) {
        query = query + `?sortBy=createdAt:${sorted}`;
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

export const createCategoryApi = async (payload: any) => {
  try {
    const response = await request('POST', `/categories`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryApi = async ({ id, data }: any) => {
  try {
    const response = await request('PATCH', `/categories/${id}`, data);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteategoryApi = async (category: any) => {
  try {
    const response = await request('DELETE', `/categories/${category}`);
    return response;
  } catch (error) {
    throw error;
  }
};
