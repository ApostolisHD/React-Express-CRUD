import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button
} from "antd";
import Axios from "axios";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [dataIndex, setDataIndex] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await Axios.get("http://localhost:5000/employee");
      console.log(request);
      setDataIndex([...request.data]);
    }
    fetchData();
  }, []);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      last_name: "",
      first_name: "",
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (record, id) => {
    try {
      const request = await Axios.put(
        `http://localhost:5000/employee/${record.id}`,
        { last_name: record.last_name }
      );
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Last Name",
      dataIndex: "last_name",
      width: "25%",
      editable: true
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      width: "15%",
      editable: true
    },
    {
      title: "Date Of Birth",
      dataIndex: "date_of_birth",
      width: "40%",
      editable: false
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save(record.id)}>save</Button>

            <Button onClick={cancel}>cancel</Button>
          </span>
        ) : (
          <Button onClick={() => edit(record)}>edit</Button>
        );
      }
    }
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell
          }
        }}
        bordered
        dataSource={dataIndex}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel
        }}
        rowKey="id"
      />
    </Form>
  );
};

ReactDOM.render(<EditableTable />, document.getElementById("container"));
