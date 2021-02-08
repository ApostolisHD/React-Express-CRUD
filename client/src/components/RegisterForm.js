import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  message ,
} from 'antd';
import Axios from "axios"


const FormRegister = () => {
const [lastnameReg ,setLastnameReg]=useState();
const [firstnameReg ,setfirstnameReg]=useState();
const [dateofbirthReg ,setdateofBirthReg]=useState(new Date());
const register = () => {

  Axios.post('api/register',{
    last_name:lastnameReg ,
    first_name:firstnameReg,
    date_of_birth:dateofbirthReg,
  }
    )
  }

  const onFinish = () => {
    message.info('Employeee is added!!!' , 3);
  };
  
   return (
    <>
      <Form onFinish={onFinish} >
      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[
          {
            required: true,
            //message: 'Please input your Last Name!',
          },
        ]}
      >
        <Input
          placeholder="Last Name"
          onChange={e => setLastnameReg(e.target.value)}
        />
        </Form.Item>

        <Form.Item
        label="First Name"
        name="first_name"
        rules={[
          {
            required: true,
            message: 'Please input your First Name!',
          },
        ]}
      >
          <Input type="text"
          placeholder="First Name"
          onChange={e => setfirstnameReg(e.target.value)}
           />
        </Form.Item>
        <Form.Item name="date-picker" type="Date" label="Year Of Birth" rules={[
          {
            required: true,
            message: 'Please input your Year Of Birth!',
          },
        ]}>
          <DatePicker dateFormat="DD/MM/YYYY" onChange={e => setdateofBirthReg(e)} />
        </Form.Item>
        <Form.Item label="Register">
          <Button type="primary" htmlType="submit" onClick={register}>Register</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormRegister;