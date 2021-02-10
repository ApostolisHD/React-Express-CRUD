import {useState, useEffect} from 'react';
import React from "react";
import 'antd/dist/antd.css';
import {Table, Space, Button, Badge} from 'antd';
import Axios from "axios";

const {Column} = Table;

const TableData = (props) => {
  const [dataIndex,setDataIndex] = useState();

  const deleteEmployee = async(id) => {
    try {
      await Axios.delete(`/api/employee/${id}`);
      setDataIndex(dataIndex.filter(dataIndex => dataIndex.id !== id));
    } catch (error) {
      console.error(error.message);
    };
  };
  const showEmployee = async() => {
    const request = await Axios.get("/api/employee");
    setDataIndex(request.data);
  }
  useEffect(() => {
    showEmployee();
  }, []);

  function Edit(id) {
    props
      .history
      .push("/employeelist/Edit/" + id);
  }

  return (
    <Table dataSource={dataIndex} rowKey={record => record.id}>
      <Column title="Last Name" dataIndex="last_name"></Column>
      <Column title="First Name" dataIndex="first_name"></Column>
      <Column title="Date Of Birth" dataIndex="date_of_birth"/>
      <Column
        title="Active"
        dataIndex="is_active"
        render={record => String(record) === "true"
        ? <Badge status="success" text="Online"/>
        : <Badge status="default" text="Offline"/>}></Column>
      <Column
        title="Action"
        key="id"
        render={(text, record) => (
        <Space size="middle">
          <Button type="primary" htmlType="submit" onClick={() => Edit(record.id)}>Edit</Button>
          <Button type="primary" danger onClick={() => deleteEmployee(record.id)}>Delete</Button>
        </Space>
      )}/>
    </Table>
  );
}
export default TableData;