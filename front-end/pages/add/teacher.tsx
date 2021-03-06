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
                message.success("???????? ?????????????????? ??????????????????.")
                console.log(teacherData, "td");
                form.resetFields();
            } else {
                message.error("???????? ?????????????? ?????????????? ????????????")
            }
        }
        if (teacherError) {
            setLoading(false);
            message.error("???????? ?????????????? ?????????????? ????????????")
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
                                <Form.Item label="?????????? ??????????????" >
                                    <Input type="file" onChange={handleFile} />
                                </Form.Item>
                            </div>
                            <div>{file ? generateFile(file) : null}</div>
                        </Col>
                        <Col span={18}>
                            <Row gutter={16} >
                                <Col span={12}>
                                    <Form.Item label="?????????????? ????????" name="lastname" rules={[{ required: true, message: "?????????????? ???????????? ?????????????? ????" }]} >
                                        <Input placeholder="?????????????? ????????" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="?????????????? ??????" name="firstname" rules={[{ required: true, message: "?????????????? ???????????? ?????????????? ????" }]} >
                                        <Input placeholder="?????????????? ??????" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="??????????" name="degree" rules={[{ required: true, message: "?????????????? ?????????????? ????" }]} >
                                        <Select >
                                            <Select.Option value="????????????????">????????????????</Select.Option>
                                            <Select.Option value="????????????????">??????????????</Select.Option>
                                            <Select.Option value="????????????">????????????</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item label="????????????" name="department" rules={[{ required: true, message: "???????????? ?????????????? ????" }]} >
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
                                    <Form.Item label="??-????????" name="email" rules={[{ required: true, message: "???????? ???? ?????????????? ????" }]}  >
                                        <Input placeholder="??-????????" type="email" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} >
                                    <Form.Item label="???????????? ????????????" name="phonenumber"  >
                                        <Input placeholder="???????????? ????????????" type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button loading={loading} className="primary-button" htmlType="submit" >???????? ??????????</Button>
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