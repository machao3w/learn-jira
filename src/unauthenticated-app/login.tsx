import React, { FormEvent } from "react";
import * as qs from "qs";
import { cleanObject } from "../utils";
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from ".";

const apiUrl = process.env.REACT_APP_API_URL;

interface LoginParam {
  username: string;
  password: string;
}

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {

  const { login, user } = useAuth();

  // const login = (loginParam: LoginParam) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(loginParam),
  //   }).then(async response => {
  //     if (response.ok) {
  //       console.log("success");
  //     }
  //   });
  // };

  const handleSubmit = (values: { username: string, password: string }) => {
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    // const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    login(values).catch(onError);
  };

  return <Form onFinish={handleSubmit}>
    {
      user ? <div>
        登录成功，用户名：{user?.name}
      </div> : null
    }
    <Form.Item name={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
      {/*<label htmlFor="username">用户名</label>*/}
      <Input placeholder={"用户名"} type="text" id={"username"}/>
    </Form.Item>

    <Form.Item name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
      {/*<label htmlFor="password">密码</label>*/}
      <Input placeholder={"密码"} type="password" id={"password"}/>
    </Form.Item>
    <Form.Item>
      <LongButton htmlType={"submit"} type={"primary"}>登录</LongButton>

    </Form.Item>
  </Form>;
};