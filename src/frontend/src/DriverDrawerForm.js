import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import { addNewDriver } from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {successNotification, errorNotification} from "./Notification";
import React,{useState} from 'react';

const {Option} = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function DriverDrawerForm({showDrawer, setShowDrawer, fetchDrivers}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = driver => {
        setSubmitting(true)
        alert(JSON.stringify(driver, null, 2));
        addNewDriver(driver)
           .then(() => {
                console.log("Driver added")
                onCLose();
                fetchDrivers();
                successNotification(
                    "Driver successfully added",
                    `${driver.name} was added to the system`
                    )
            }).catch(err => {
                console.log(err);
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [${res.status}] [${res.error}]`,
                        "bottomLeft"
                    )
                });
            }).finally(() => {
                setSubmitting(false);
            })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new driver"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter driver name'}]}
                    >
                        <Input placeholder="Please enter driver name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="nationality"
                        label="Nationality"
                        rules={[{required: true, message: 'Please enter your nationality'}]}
                    >
                        <Input placeholder="Please enter your nationality"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="team"
                        label="Team"
                        rules={[{required: true, message: 'Please select a team'}]}
                    >
                        <Select placeholder="Please select a team">
                            <Option value="RED_BULL_RACING">RED BULL RACING</Option>
                            <Option value="MERCEDES_AMG_F1">MERCEDES</Option>
                            <Option value="SCUDERIA_FERRARI">FERRARI</Option>
                            <Option value="MCLAREN_RACING">MCLAREN_RACING</Option>
                            <Option value="ALFA_ROMEO_RACING">ALFA_ROMEO_RACING</Option>
                            <Option value="ASTON_MARTIN_F1_TEAM">ASTON_MARTIN_F1_TEAM</Option>
                            <Option value="HAAS_F1">HAAS_F1</Option>
                            <Option value="WILLIAMS_RACING">WILLIAMS_RACING</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {submitting && <Spin indicator={antIcon} />}
            </Row>
        </Form>
    </Drawer>
}

export default DriverDrawerForm;