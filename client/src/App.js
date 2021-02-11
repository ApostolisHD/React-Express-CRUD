import './styles/App.css';
import {Layout,Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import React from "react";
import Home from "./components/routes"
const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header style={{ padding: 10 }}>
          <Avatar style={{ float: "right" }} icon={<UserOutlined />} />
          <h1 style={{ color: "white" }} level={3}>Employee</h1>
        </Header>
        <Layout style={{ textAlign: "center" }}>
          <Content style={{ paddingRight: '10%', paddingBottom: "20%" }}>
            <div className="site-layout-content"><Home /></div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
