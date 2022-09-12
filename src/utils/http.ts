import qs from "qs";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface HttpConfig extends RequestInit {
  token?: string,
  data?: Record<string, unknown>,

}

export const http = async (endpoint: string, { data, token, headers, ...httpConfig }: HttpConfig = {}) => {

  const config = {
    method: "GET",
    headers: {
      "Authorization": token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",

    },
    ...httpConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.loginOut();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });

};


export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token });
};