import { request } from '../common/request';

export const dashboardApi = async () => {
  try {
    const response = await request('GET', `/report/dashboard`);
    return response;
  } catch (error) {
    throw error;
  }
};
