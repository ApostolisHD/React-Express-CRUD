import React from "react";
import 'antd/dist/antd.css';
import {useState, useEffect} from 'react';
import Axios from "axios";
import {Form, Button, Select, Input, DatePicker} from 'antd';
import FormItem from "antd/lib/form/FormItem";

const EditEmployee = (props) => {
  const [lastnameReg,setLastnameReg] = useState();
  const [firstnameReg,setfirstnameReg] = useState();
  const [isActive,setIsActive] = useState();
  const [dateofbirthReg,setdateofBirthReg] = useState();
  const {Option} = Select;
  const dateFormat = 'DD/MM/YYYY';

  const showEmployee = async() => {
    const id = props.match.params.id;
    const request = await Axios.get(`/api/employee/${id}`);
    setLastnameReg(request.data.rows[0].last_name);
    setfirstnameReg(request.data.rows[0].first_name);
    setIsActive(request.data.rows[0].is_active);
    setdateofBirthReg(request.data.rows[0].date_of_birth);
  };

  useEffect(() => {
    showEmployee();
  }, []);

  const onFinish = async() => {
    const id = props.match.params.id
    await Axios.put(`/api/employee/${id}`, {
      last_name: lastnameReg,
      first_name: firstnameReg,
      is_active: isActive,
      date_of_birth: dateofbirthReg
    });
    props
      .history
      .push("/employeelist");
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item label="Last Name">
        <Input
          name="last_name"
          value={lastnameReg}
          onChange={e => setLastnameReg(e.target.value)}/>
      </Form.Item>
      <Form.Item label="First Name">
        <Input
          name="first_name"
          value={firstnameReg}
          onChange={e => setfirstnameReg(e.target.value)}/>
      </Form.Item>
      <FormItem label="Active">
        <Select
          value={String(isActive)}
          style={{
          width: "10%"
        }}
          onChange={e => setIsActive(e)}>
          <Option value="true">Online</Option>
          <Option value="false">Offline</Option>
        </Select>
      </FormItem>
      <FormItem>
        <DatePicker format={dateFormat} onChange={e => setdateofBirthReg(e)}/>
      </FormItem>
      <Form.Item label="Edit">
        <Button type="primary" htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
};
export default EditEmployee;