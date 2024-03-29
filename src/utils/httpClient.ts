import axiosInstance from "./axiosConfig";

export const postRequest = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRequest = async (endpoint: string, data: any) => {
  try {
    const response = await axiosInstance.get(endpoint, {
      params: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
