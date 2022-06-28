import { Row, Col, Input, Button, Form, Typography, message } from "antd"
import { LoginService } from "../Services/lib/login";
import { useUser } from "../Context/user";
import { UseApi } from "../Hooks/useApi";
import { useEffect } from "react";
const AdminPage = () => {


    const [{ data, isLoading, error }, fetch] = UseApi({ service: LoginService });
    const { userAction } = useUser();
    const { Title } = Typography;

    const loginHandler = (values: any) => {

        const { email, password } = values;

        // console.log(email, "email", password, "passowrd");
        fetch({ email: email, password: password });
    }

    useEffect(() => {

        if (data) {

            if (data.data.statusCode === 401) {
                message.error("Нууц үг эсвэл хэрэглэгчийн нэр буруу байна.");
            } else {
                userAction({ action: "login", state: data.data.access_token, role: data.data.role })
                // console.log(data, "logindata");
            }
        }
        if (error) {
            console.log(error, "login error");
        }
    }, [data, error])

    return (
        <Row className="height-88" >
            <Col className=" login-container justify-content-center  d-flex flex-direction-column align-items-center" span={24}  >
                <div className="login">
                    <Title level={3} className="mb-2" >Админ хуудасруу нэвтрэх</Title>
                    <br />
                    <Form onFinish={loginHandler} layout="vertical" >
                        <Form.Item name="email" label="Хэрэглэгчийн нэвтрэх нэр" required >
                            <Input placeholder="Нэвтрэх нэр" />
                        </Form.Item>
                        <Form.Item name="password" label="Хэрэглэгчийн нууц үг" required >
                            <Input placeholder="Нууц үг" type="password" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" className="primary-button" >Нэвтрэх</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    )
}
export default AdminPage;