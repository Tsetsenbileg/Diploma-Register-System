import { Col, Row, Form, Upload, Button, message, Input, Select } from "antd"
import { UploadOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import axios from "axios";
import { useState, useEffect } from "react"
import { UseApi } from "../../Hooks/useApi";
import { UploadService } from "../../Services/lib/upload";
import { CreateTeacherService } from "../../Services/teacher";
import WithAuth from "../../HOC";
const CreateTeacherPage = ({ data }: any) => {


    const [{ data: uploadData, error: uploadError }, uploadFetch] = UseApi({ service: UploadService })
    const [{ data: teacherData, error: teacherError }, createTeacherFetch] = UseApi({ service: CreateTeacherService })
    const [file, setFile] = useState<any>(undefined);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    const addTeacher = (values: any) => {

        const { firstname, lastname, phonenumber, degree, department, email } = values;

        // createTeacherFetch({ ...values });
        console.log(phonenumber, "phone");
        if (file) {
            let formdata = new FormData();
            formdata.append('file', file);
            uploadFetch(formdata);
            setLoading(true);
        } else {
            setLoading(true);
            createTeacherFetch({
                firstname: firstname,
                lastname: lastname,
                degree: degree,
                phonenumber: +phonenumber,
                photo_url: null,
                departmentId: department,
                email: email
            })
        }

    }

    const handleFile = (e: any) => {
        setFile(e.target.files[0]);
        // console.log(e.target.files[0], "file");
    }

    const generateFile = (file: any) => {

        if (file) {
            return (
                <div>
                    <Row>
                        <Col span={24}>
                            <div>
                                <img src={URL.createObjectURL(file)} alt="file" style={{ width: "100%" }} />
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        }

    }

    useEffect(() => {

        if (teacherData) {

            setLoading(false);
            if (teacherData.data) {
                message.success("Багш амжилттай нэмэгдлээ.")
                console.log(teacherData, "td");
                form.resetFields();
            } else {
                message.error("Багш нэмэхэд асуудал гарлаа")
            }
        }
        if (teacherError) {
            setLoading(false);
            message.error("Багш нэмэхэд асуудал гарлаа")
        }
    }, [teacherData, teacherError])

    useEffect(() => {

        if (uploadData) {


            createTeacherFetch({
                firstname: form.getFieldValue("firstname"),
                lastname: form.getFieldValue("lastname"),
                degree: form.getFieldValue("degree"),
                phonenumber: +form.getFieldValue("phonenumber"),
                photo_url: uploadData.data.filename,
                departmentId: form.getFieldValue("department"),
                email: form.getFieldValue("email")
            })
        }
        if (uploadError) {
            console.log(uploadError, "upload error");
        }

    }, [uploadData, uploadError])

    return (
        <Row >
            <Col span={24} className="mt-1" >
                <Form layout="vertical" onFinish={addTeacher} form={form} >
                    <Row gutter={16} >
                        <Col span={6} >
                            <div className="d-flex justify-centent-center align-center" >
                                <Form.Item label="Зураг оруулах" >
                                    <Input type="file" onChange={handleFile} />
                                </Form.Item>
                            </div>
                            <div>{file ? generateFile(file) : null}</div>
                        </Col>
                        <Col span={18}>
                            <Row gutter={16} >
                                <Col span={12}>
                                    <Form.Item label="Багшийн овог" name="lastname" rules={[{ required: true, message: "Багшийн овгийг оруулна уу" }]} >
                                        <Input placeholder="Багшийн овог" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Багшийн нэр" name="firstname" rules={[{ required: true, message: "Багшийн нэрийг оруулна уу" }]} >
                                        <Input placeholder="Багшийн нэр" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Зэрэг" name="degree" rules={[{ required: true, message: "Зэргийг сонгоно уу" }]} >
                                        <Select >
                                            <Select.Option value="Бакалавр">Бакалавр</Select.Option>
                                            <Select.Option value="Магистер">Магистр</Select.Option>
                                            <Select.Option value="Доктор">Доктор</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item label="Тэнхим" name="department" rules={[{ required: true, message: "Тэнхим сонгоно уу" }]} >
                                        <Select>
                                            {data.map((item: any) => {
                                                return (
                                                    <Select.Option value={item.id} key={item.id} >{item.name}</Select.Option>
                                                )
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} >
                                <Col span={12} >
                                    <Form.Item label="И-мэйл" name="email" rules={[{ required: true, message: "мэйл ээ оруулна уу" }]}  >
                                        <Input placeholder="И-мэйл" type="email" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item label="Утасны дугаар" name="phonenumber"  >
                                        <Input placeholder="Утасны дугаар" type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button loading={loading} className="primary-button" htmlType="submit" >Багш нэмэх</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}

CreateTeacherPage.getInitialProps = async ({ query }: any) => {

    const cookie = new Cookies();
    // let result = [];
    let config = {
        headers: {
            "Authorization": `Bearer ${cookie.get("token_diploma")}`
        }
    }

    // console.log(query, "query");
    const result = await axios.get("http://localhost:7000/department/get-all", config)
    return {
        data: result
    }
}

export default WithAuth(CreateTeacherPage);