import axios from "axios";

const baseURL = "http://thanyaproject.runasp.net/api";

const api = axios.create({ baseURL });

export const apiGet = async (path, params) => {
  try {
    const response = await api.get(path, { params, withCredentials: true });
    console.log('response:: ', response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${path} :: ${error}`);
    throw error;
  }
};

export const apiPost = async (path, data, params) => {
  try {
    const response = await api.post(path, data, { params, withCredentials: true });
    console.log('response:: ', response);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${path} :: ${error}`);
    throw error;
  }
};

export const apiPut = async (path, data, params) => {
  try {
    const response = await api.put(path, data, { params, withCredentials: true });
    console.log('response:: ', response);
    return response.data;
  } catch (error) {
    console.error(`Error putting data to ${path} :: ${error}`);
    throw error;
  }
};

export const apiDelete = async (path, data, params) => {
  try {
    const response = await api.delete(path, { data, params, withCredentials: true });
    console.log('response:: ', response);
    return response.data;
  } catch (error) {
    console.error(`Error deleting data from ${path} :: ${error}`);
    throw error;
  }
};
