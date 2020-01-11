import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getTimeoutError } from '~lib/error';

const AXIOS_TIMEOUT = 5 * 60 * 1000;

export default async (options: AxiosRequestConfig): Promise<AxiosResponse> => {
  try {
    return await axios({ ...options, timeout: AXIOS_TIMEOUT });
  } catch (error) {
    if (error.code === 'ECONNABORTED' || error.code === 'ECONNREFUSED') {
      throw getTimeoutError();
    } else {
      throw error;
    }
  }
};
