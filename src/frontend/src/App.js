import React, { useState, useEffect } from 'react';
import { getAllDrivers } from "./client";
import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty,
    Button,
    Badge,
    Tag,
    Avatar,
    Radio, Popconfirm, Image
} from 'antd';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';

import './App.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>
        {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
    </Avatar>
}

const columns = fetchDrivers => [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, driver) =>
              <TheAvatar name={driver.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Nationality',
        dataIndex: 'nationality',
        key: 'nationality',
    },
    {
        title: 'Team',
        dataIndex: 'team',
        key: 'team',
    }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {
  const [drivers, setDrivers] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const fetchDrivers = () =>
    getAllDrivers()
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setDrivers(data);
            setFetching(false);
        })
        .catch(e => {
            console.log(e);
        });

  useEffect(() => {
    console.log("component is mounted");
    fetchDrivers();
  }, []);

const renderDrivers = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (drivers.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Driver
                </Button>
                <Empty/>
            </>
        }
        return <>
            <Table
                dataSource={drivers}
                columns={columns(fetchDrivers)}
                bordered
                title={() =>
                    <>
                        <Tag>Number of drivers</Tag>
                        <Badge count={drivers.length} className="site-badge-count-4"/>
                        <br/><br/>
                        <Button
                            onClick={() => setShowDrawer(!showDrawer)}
                            type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                            Add New Driver
                        </Button>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={driver => driver.id}
            />
        </>
    }

  return <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed}
                 onCollapse={setCollapsed}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  <Menu.Item key="1" icon={<PieChartOutlined />}>
                      Option 1
                  </Menu.Item>
                  <Menu.Item key="2" icon={<DesktopOutlined />}>
                      Option 2
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                      <Menu.Item key="3">Tom</Menu.Item>
                      <Menu.Item key="4">Bill</Menu.Item>
                      <Menu.Item key="5">Alex</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                      <Menu.Item key="6">Team 1</Menu.Item>
                      <Menu.Item key="8">Team 2</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="9" icon={<FileOutlined />}>
                      Files
                  </Menu.Item>
              </Menu>
          </Sider>
          <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>User</Breadcrumb.Item>
                      <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                      {renderDrivers()}

                  </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
      </Layout>
}

export default App;
