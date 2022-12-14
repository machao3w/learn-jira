import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/lib/table";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];

}

export const List = ({ users, ...props }: ListProps) => {
  // console.log(list);
  return <Table rowKey={(record) => record.id} pagination={false} columns={[
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "部门",
      dataIndex: "organization",

    },
    {
      title: "负责人",
      render(value, project) {
        return <span>{users.find(user => user.id === project.personId)?.name || "未知"}</span>;
      },
    },
    {
      title: "创建时间",
      dataIndex: "organization",
      render(value, project) {
        return <span>{project.created ? dayjs(project.created).format("YYYY-MM-DD") : "无"}</span>;
      },
    },
  ]} {...props}/>;
  // return <table>
  //   <thead>
  //   <tr>
  //     <th>名称</th>
  //     <th>负责人</th>
  //   </tr>
  //   </thead>
  //   <tbody>
  //   {
  //     list.map(e => <tr key={e.id}>
  //       <td>{e.name}</td>
  //       <td>{users.find(user => user.id === e.personId)?.name || "未知"}</td>
  //     </tr>)
  //   }
  //   </tbody>
  // </table>;
};