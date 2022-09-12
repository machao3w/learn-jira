import React, { ReactNode, useContext, useState } from "react";
import * as auth from "../auth-provider";
import { User } from "../screen/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";

const AuthContext = React.createContext<{
  user: User | null,
  register: (form: AuthForm) => Promise<void>,
  login: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>,
} | undefined>(undefined);

interface AuthForm {
  username: string,
  password: string,
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;


};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // point 消参
  const login = (form: AuthForm) => auth.login(form).then(setUser);

  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user));


  const logout = () => auth.loginOut().then(() => setUser(null));
  console.log("user:::", user);
  console.log("username:::", user?.name);

  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return <AuthContext.Provider value={{ user, login, register, logout }}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("userAuth必须在AuthProvider中使用");
  }
  return context;
};