import React, { useState, useEffect } from 'react';
import { deleteDriver, getAllDrivers } from "./client";
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
    Radio,
    Popconfirm
} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import DriverDrawerForm from "./DriverDrawerForm";
import './App.css';
import {errorNotification, successNotification} from "./Notification";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

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

const removeDriver = (driverId, callback) => {
     deleteDriver(driverId).then(() => {
        successNotification("Driver deleted", `Driver with ID: ${driverId} was deleted`);
        callback();
    }).catch(err => {
        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "There was an issue",
                `${res.message} [${res.status}] [${res.error}]`
            )
        });
    })
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
    },
    {
         title: 'Action',
         key: 'action',
         render: (text, driver) =>
             <Radio.Group>
                 <Popconfirm
                     placement='topRight'
                     title={`Are you sure you want to delete ${driver.name}`}
                     onConfirm={() => removeDriver(driver.id, fetchDrivers)}
                     okText='Yes'
                     cancelText='No'>
                     <Radio.Button value="small">Delete</Radio.Button>
                 </Popconfirm>
                 <Radio.Button value="small">Edit</Radio.Button>
             </Radio.Group>
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
            <DriverDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchDrivers={fetchDrivers}
            />
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
                      Formula 1
                  </Menu.Item>
                  <Menu.Item key="2" icon={<DesktopOutlined />}>
                      Formula 2
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Drivers">
                      <Menu.Item key="3">2021</Menu.Item>
                      <Menu.Item key="4">2022</Menu.Item>
                      <Menu.Item key="5">2023</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<TeamOutlined />} title="Teams">
                      <Menu.Item key="6">Team 1</Menu.Item>
                      <Menu.Item key="8">Team 2</Menu.Item>
                  </SubMenu>

              </Menu>
          </Sider>
          <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>Season</Breadcrumb.Item>
                      <Breadcrumb.Item>2022</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                      {renderDrivers()}

                  </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>By Michael Zhou
              </Footer>
          </Layout>
      </Layout>
}

export default App;
