import React, {useState} from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Switch
} from 'antd';
import Axios from "axios";
import FormItem from 'antd/lib/form/FormItem';

const FormRegister = () => {
  const [lastnameReg,setLastnameReg] = useState();
  const [firstnameReg,setfirstnameReg] = useState();
  const [isActive,setIsActive] = useState(false);
  const [dateofbirthReg,setdateofBirthReg] = useState();
  const dateFormat = 'DD/MM/YYYY';
  const [form] = Form.useForm();

  const register = () => {
    Axios.post('/api/register', {
      last_name: lastnameReg,
      first_name: firstnameReg,
      is_active: isActive,
      date_of_birth: dateofbirthReg
    });
  };

  const onFinish = () => {
    form.setFieldsValue({last_name: "", first_name: "", date_of_birth: ""});
    message.info('Employeee is added!!!', 3);
  };

  const handleClick = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{
          required: true,
          message: 'Please input your Last Name!'
        }
      ]}>
        <Input placeholder="Last Name" onChange={e => setLastnameReg(e.target.value)}/>
      </Form.Item>
      <Form.Item
        label="First Name"
        name="first_name"
        rules={[{
          required: true,
          message: 'Please input your First Name!'
        }
      ]}>
        <Input
          type="text"
          placeholder="First Name"
          onChange={e => setfirstnameReg(e.target.value)}/>
      </Form.Item>
      <Form.Item
        name="date_of_birth"
        type="Date"
        label="Date Of Birth"
        rules={[{
          required: true,
          message: 'Please input your Year Of Birth!'
        }
      ]}>
        <DatePicker format={dateFormat} onChange={e => setdateofBirthReg(e)}/>
      </Form.Item>
      <FormItem label="Active">
        <Switch onClick={handleClick}/>
      </FormItem>
      <Form.Item label="Register">
        <Button type="primary" htmlType="submit" onClick={register}>Register</Button>
      </Form.Item>
    </Form>

  );
};
export default FormRegister;