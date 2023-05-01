import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_PROTECTED_API,
    withCredentials: false,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.headers?.Authorization == null) {
        throw new Error("Missing Authorization header")
      } 
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

const setAccessToken = (accessToken: string | null) => {
    instance.defaults.headers.common["Authorization"] = accessToken ? `Bearer ${accessToken}` : null;
}

export { instance, setAccessToken }