import { useState, useEffect , useContext} from 'react';
import React from "react"
import 'antd/dist/antd.css';
import { Table, Space, Button, Input, Form,Switch,message} from 'antd';
import Axios from "axios"
import FormItem from 'antd/lib/form/FormItem';

const {Column} = Table;

const TableData = (props) => {
  const [form] = Form.useForm();
  const [dataIndex, setDataIndex] = useState()
  const [lastnameReg ,setLastnameReg]=useState();
  const [firstnameReg ,setfirstnameReg]=useState();
  const [isActive , setIsActive]= useState(false);
 
  console.log(props)
  const updateEmployee =  async(id) => {
    const request = await Axios.put(
      `/api/employee/${id}`, {
      last_name:lastnameReg,
      first_name:firstnameReg,
      is_active:isActive
    })
    console.log(request);
  }

  
  const deleteEmployee = async (id) => {
    try {
      const deleteEmployee = await Axios.delete(`api/employee/${id}`)
      console.log(deleteEmployee)
      setDataIndex(dataIndex.filter(dataIndex => dataIndex.id !== id))
    } catch (error) {
      console.error(error.message)
    }
  }
  //useEffect(()=> {deleteEmployee()},[])
  
  const showEmployee =  async () => {
    const request = await Axios.get("api/employee")
    const employee={employee:request.data.map(entry => entry.last_name)}
    console.log(employee)
    setDataIndex(request.data)  
  }
  useEffect(() => {showEmployee() }, [])

  const handleClick = () => {
    if (!isActive) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  const onFinish = () => {
    message.info('Employeee Is Updated!!!' , 3);
  };
  

  // function handleChange(event) {
  //   const inputName = event.target.name
  //   //const prevValue = value
  //   if (inputName === "first_name"){
  //     setfirstnameReg(event.target.value)
  //   }
  //   if (inputName === "last_name"){
  //     setLastnameReg(event.target.value)
  //   }
  // }

  return (
    <Form onFinish={onFinish}>
      <Table dataSource={dataIndex} rowKey={record => record.id}>
          <Column title="Last Name" dataIndex="last_name" render={(text, record) => 
          <Input
          name="last_name"
          type="text"
          defaultValue={record.last_name}
          onChange={e => setLastnameReg(e.target.value)}
          />}></Column>
          <Column title="First Name" dataIndex="first_name" 
          render={(text, record) => 
          <Input          
          defaultValue={record.first_name}
          type="text"
          name="first_name"
          onChange={e => setfirstnameReg(e.target.value)}
          />}></Column>
        <Column title="Date Of Birth" dataIndex="date_of_birth" />
        <Column title="Active" dataIndex="is_active" 
        render ={record=> <Switch onClick={handleClick} checked={record.isActive}/> 
        }></Column>  
        <Column title="Action" key="id" render={(text, record) => (
          <Space size="middle">
            <Button type="primary" htmlType="submit" onClick={() =>updateEmployee(record.id)}>Save</Button>
            <Button onClick={() => deleteEmployee(record.id)}>Delete</Button>
          </Space>
        )}
        />
      </Table>
      </Form>
  );
}
export default TableData;