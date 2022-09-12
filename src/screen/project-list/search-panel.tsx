import { useEffect, useState } from "react";
import React from "react";
import { Form, Input, Select } from "antd";


export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;

}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {


  // setParam(Object.assign({}, param, { name: "" }));
  return <Form style={{marginBottom:'2rem'}} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          type="text"
          value={param.name}
          onChange={event => setParam({
          ...param,
          name: event.target.value,
        })}>
        </Input>
      </Form.Item>

      <Form.Item>
        <Select value={param.personId} onChange={value => setParam({
          ...param,
          personId: value,
        })}>

          <Select.Option value={""}>
            负责人
          </Select.Option>
          {
            users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
          }
        </Select>
      </Form.Item>
  </Form>;
};