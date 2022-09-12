import { User } from "./screen/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageAuthKey = "_token_";

export const getToken = () => window.localStorage.getItem(localStorageAuthKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageAuthKey, user.token || "");
  return user;
};


export const register = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};


export const login = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// async 方法返回就变成promise
export const loginOut = async () => window.localStorage.removeItem(localStorageAuthKey);