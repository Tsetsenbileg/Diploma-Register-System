
import { Row, Col, Steps, Button, message, Form, Input, Typography, Modal } from "antd"
import { useState } from "react";
import { BankOutlined, UserOutlined } from "@ant-design/icons";
import { RegisterService } from "../../Services/admin";
import { UseApi } from "../../Hooks/useApi";
import { useEffect } from "react";
import WithAuth from "../../HOC";
const AddAdminFormPage = () => {

    const [visible, setVisible] = useState(false);
    const [{ data, isLoading, error }, fetch] = UseApi({ service: RegisterService });
    const { Step } = Steps;
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const { Title, Text } = Typography;
    const steps = [
        {
            title: 'Админы мэдээлэл',
            icon: <UserOutlined />
        }, {
            title: "Сургуулийн мэдээлэл",
            icon: <BankOutlined />

        }
    ]

    const next = () => {
        setCurrent((current: number) => current + 1);
        console.log(form.getFieldValue('firstname'), "form");

    }
    const prev = () => {
        setCurrent((current: number) => current - 1);
    }

    const addAdmin = (values: any) => {

        const { schoolname, address, schoolphone, description } = values;
        let firstname = form.getFieldValue('firstname');
        let lastname = form.getFieldValue('lastname');
        let phone = form.getFieldValue('phone');
        let email = form.getFieldValue('email');
        let data = { firstname: firstname, lastname: lastname, phonenumber: +phone, email: email, university_name: schoolname, address: address, university_number: +schoolphone, description: description };
        if (email && phone && schoolphone && schoolname && firstname && lastname && address) {
            fetch({ ...data })
            console.log(data, "data");
        }
        // console.log(form.getFieldValue("lastname"), "valval");
    }

    useEffect(() => {

        if (data) {
            console.log(data, "data");
            if (data.data.success) {
                form.resetFields();
                setVisible(true);
            } else {
                message.error("Админ нэмэх явцад алдаа гарлаа");
            }
        }

        if (error) {
            message.error("Админ нэмэхэд алдаа гарлаа");
            console.log(error, "error at add admin");
        }

    }, [data, error])

    const AdminInfo = () => {

        return (
            <>
                <Form.Item required name="lastname" label="Овог">
                    <Input placeholder="Админы овог" />
                </Form.Item>
                <Form.Item required name="firstname" label="Нэр">
                    <Input placeholder="Адмны нэр" />
                </Form.Item>
                <Form.Item required name="email" label="И-мэйл" >
                    <Input type="email" placeholder="и-мэйл" />
                </Form.Item>
                <Form.Item name="phone" label="Утасны дугаар" >
                    <Input placeholder="Утасны дугаар" />
                </Form.Item>
            </>
        )
    }
    const SchoolInfo = () => {
        const { TextArea } = Input;

        return (
            <>
                <Form.Item name="schoolname" required label="Сургуулийн нэр"  >
                    <Input placeholder="Сургуулийн нэр" />
                </Form.Item>
                <Form.Item name="schoolphone" required label="Утасны дугаар" >
                    <Input placeholder="Утасны дугаар" />
                </Form.Item>
                <Form.Item name="address" label="Хаяг"  >
                    <Input placeholder="Хаяг" />
                </Form.Item>
                <Form.Item name="description" label="Дэлгэрэнгүй" >
                    <TextArea rows={4} placeholder="Сургуулийн дэлгэрэнгүй мэдээлэл" />
                </Form.Item>
            </>
        )
    }


    return (
        <Col span={24} >
            <Form onFinish={addAdmin} form={form} >
                <Steps current={current} className="mt-1 mb-1"  >
                    {steps.map(item => (<Step key={item.title} title={item.title} icon={item.icon} />))}
                </Steps>
                <Row justify="center">
                    <Col span={24} >
                        {current === 0 ? <AdminInfo /> : <SchoolInfo />}
                    </Col>
                </Row>
                <div className="steps-action mt-1 ">
                    {current < steps.length - 1 && (
                        <Button className="primary-button" onClick={() => next()}>
                            Дараагийн
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button className="primary-button" htmlType="submit" >
                            Хадгалах
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Өмнөх
                        </Button>
                    )}
                </div>
            </Form>
            <Modal footer={null} closable onCancel={() => setVisible(false)} visible={visible} >
                <Text type="success" > Админ амжилттай үүслээ. Бүртгүүлсэн имэйл хаягруу нууц үг илгээгдсэн. </Text>
            </Modal>
        </Col>
    );

}


export default WithAuth(AddAdminFormPage);