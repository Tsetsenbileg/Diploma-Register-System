import { Row, Col, Menu, Form, Modal, Input, message, notification, Button, Divider } from "antd"
import { UserAddOutlined, LogoutOutlined, TableOutlined, AppstoreAddOutlined, KeyOutlined, FileAddOutlined } from "@ant-design/icons";
import { useUser } from "../Context/user";
import Link from "next/link";
import { useState, useEffect } from 'react'
import { UseApi } from "../Hooks/useApi";
import { CreateDepartmentService } from "../Services/department";
import { UpdatePassword } from "../Services/admin";
import { formatStrategyValues } from "rc-tree-select/lib/utils/strategyUtil";

const Sidebar = () => {

    const { getRole, userAction } = useUser();
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [{ data: departmentData, isLoading: departmentLoading, error: departmentError }, fetchDepartment] = UseApi({ service: CreateDepartmentService });
    const [{ data: passwordData, isLoading: passwordLoading, error: passwordError }, fetchPassword] = UseApi({ service: UpdatePassword });

    const isSuper = getRole() === "super";


    const handleLogout = () => {
        userAction({
            action: "logout",
            state: "",
            role: ""
        })
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const createDepartment = () => {
        if (form.getFieldValue("name")) {
            fetchDepartment({
                name: form.getFieldValue("name"),
                description: form.getFieldValue("description") ? form.getFieldValue("description") : ""
            })
        } else {
            openNotification('warning', "Please enter department name");
        }
    }

    const showModal = () => {
        setVisible(true);
    }

    const openNotification = (type: any, message: any) => {

        notification[type]({
            message: message,
            description: "",
        });

    }

    const changePassword = (values: any) => {

        const { oldpassword, newpassword } = values;
        fetchPassword({ oldPassword: oldpassword, newPassword: newpassword })

    }

    useEffect(() => {
        if (departmentData) {
            setVisible(false);
            form.resetFields();
            openNotification('success', "Department created successfully");
        }
        if (departmentError) {
            openNotification('error', "Error creating department");
            console.log(departmentError, "department error");
        }
    }, [departmentData, departmentError])

    useEffect(() => {

        if (passwordData) {
            if (passwordData.data.success) {
                openNotification('success', passwordData.data.message);
            } else {
                openNotification('error', passwordData.data.message);
            }
        }
        if (passwordError) {
            console.log(passwordError, "password error");
            openNotification('error', "Error changing password");
        }

    }, [passwordData, passwordError])


    return (
        <Col span={24} className="height-100  d-flex flex-direction-column justify-content-space-between "  >
            <div >
                <div className="logo bg-primary">
                    <Link href="/">
                        <span  >diploma</span>
                    </Link>
                </div>
                <Menu className="bg-primary color-white mt-1 " >
                    <Menu.Item defaultChecked key="dashboard" icon={<TableOutlined />} >
                        <Link href="/dashboard" >
                            <span className="color-white" >
                                ???????????????? ??????????
                            </span>
                        </Link>
                    </Menu.Item>
                    {!isSuper && <Menu.Item key="create-department" icon={<AppstoreAddOutlined />} >
                        {/* <Link href="/create/department" > */}
                        <span onClick={showModal} >
                            ???????????? ????????????
                        </span>
                        {/* </Link> */}
                        <Modal confirmLoading={departmentLoading ? departmentLoading : false} okText="???????????? ????????????" cancelText="????????????" closable visible={visible} onOk={createDepartment} onCancel={handleCancel} >
                            <Form form={form} layout="vertical" >
                                <Form.Item rules={[{ required: true, message: "?????????????????? ?????? ?????????????? ????" }]} name="name" label="?????????????????? ??????" >
                                    <Input placeholder="???????????????? ???????????????????????? ???????????? ????????????..." />
                                </Form.Item>
                                <Form.Item name="description" label="??????????????" >
                                    <Input placeholder="?????????????? ??????????..." />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Menu.Item>}
                    {!isSuper && <Menu.Item key="add-teacher" icon={<UserAddOutlined />} >
                        <Link href="/add/teacher" >
                            <span className="color-white" >
                                ???????? ??????????
                            </span>
                        </Link>
                    </Menu.Item>}
                    {!isSuper && <Menu.Item key="add-diplom" icon={<FileAddOutlined />} >
                        <Link href="/add/diplom" >
                            <span>
                                ???????????? ??????????
                            </span>
                        </Link>
                    </Menu.Item>}
                    {isSuper ? <Menu.Item key="add-admin" icon={<UserAddOutlined />} >
                        <Link href="/add/admin" >
                            <span className="color-white" >?????????? ??????????</span>
                        </Link>
                    </Menu.Item> : null}
                </Menu>
            </div>
            <div>
                <Divider style={{ backgroundColor: "#553d67" }} />
                <Menu className="color-white bg-primary " >

                    <Menu.Item key="change-password" icon={<KeyOutlined />} >
                        <span onClick={() => setPasswordVisible(true)} >
                            ???????? ???? ??????????
                        </span>
                        <Modal visible={passwordVisible} closable onCancel={() => setPasswordVisible(false)} footer={null} >
                            <Form layout="vertical" onFinish={changePassword}>
                                <Form.Item name="oldpassword" label="???????? ????" rules={[{ required: true, message: '???????? ???????? ?????????????? ????' }]}>
                                    <Input.Password placeholder="???????? ????" />
                                </Form.Item>
                                <Form.Item name="newpassword" label="???????? ???????? ????" rules={[{ required: true, message: "???????? ???????? ???????? ?????????????? ????" }]}  >
                                    <Input.Password placeholder="???????? ???????? ????" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">???????? ???? ??????????</Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => handleLogout()} >
                        ??????????
                    </Menu.Item>
                </Menu>
                {/* <Divider style={{ backgroundColor: "#553d67" }} /> */}
            </div>
        </Col>
    )

}

export default Sidebar;