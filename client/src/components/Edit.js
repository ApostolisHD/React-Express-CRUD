import { Input } from "antd"
import React from "react"
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';
import Axios from "axios"
import {Form,Button,Switch} from 'antd';

const EditEmployee = (props) => {
  const [lastnameReg, setLastnameReg] = useState();
  const [firstnameReg, setfirstnameReg] = useState();
  const [isActive, setIsActive] = useState();

  const showEmployee = async () => {
    const id = props.match.params.id
    const request = await Axios.get(`/api/employee/${id}`)
    console.log(request.data.rows[0].last_name)
    setLastnameReg(request.data.rows[0].last_name)
    setfirstnameReg(request.data.rows[0].first_name)
    setIsActive(request.data.rows[0].is_active)
  }
  useEffect(() => {showEmployee() }, [])

  const onFinish = async () => {
    const id = props.match.params.id
    const request = await Axios.put(`/api/employee/${id}`, {
      last_name: lastnameReg,
      first_name: firstnameReg,
      is_active: isActive
    })
    console.log(request);
    props.history.push("/employeelist")
  }
  const handleClick = () => {
    if (!isActive) {
      setIsActive("true")
    } else {
      setIsActive("false")
    }
  }

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item label="Last Name">
          <Input
            name="last_name"
            placeholder={lastnameReg}
            onChange={e => setLastnameReg(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="First Name">
          <Input
            name="first_name"
            type="text"
            placeholder={firstnameReg}
            onChange={e => setfirstnameReg(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Active">
          <Switch
            onClick={handleClick}
            defaultChecked={isActive}
          />
        </Form.Item>
        <Form.Item label="Edit">
          <Button type="primary" htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default EditEmployee;