import { Col, Row, Form, message, Input, Button, DatePicker, Select } from "antd"
import WithAuth from "../../HOC"
import Cookies from "universal-cookie";
import axios from "axios";
import { UseApi } from "../../Hooks/useApi";
import { UploadService } from "../../Services/lib/upload";
import { CreateDiplomaService } from "../../Services/diploma";
import { useState, useEffect } from "react"
const AddDiplomaPage = ({ departments, teachers }: any) => {


    const [{ data: uploadData, error: uploadError }, uploadFetch] = UseApi({ service: UploadService })

    const [{ data: diplomaData, error: diplomaError }, createDiplomaFetch] = UseApi({ service: CreateDiplomaService })

    const [file, setFile] = useState<any>(undefined);
    const [form] = Form.useForm();
    const { TextArea } = Input;


    const handleFile = (e: any) => {
        setFile(e.target.files[0]);
    }
    const addDiploma = (values: any) => {

        const { title, teacher, department, year, lastname, firstname, id, description } = values;

        let data = {

        }


        if (file) {
            let formdata = new FormData();
            formdata.append('file', file);
            uploadFetch(formdata);
        } else {
            message.error("PDF файл оруулна уу!");
        }

        console.log(data, "values");
    }

    useEffect(() => {

        if (uploadData) {

            console.log(form.getFieldValue("teacher"), "teachers");
            createDiplomaFetch({
                title: form.getFieldValue("title"),
                year: new Date(form.getFieldValue("year")).getFullYear(),
                file: uploadData.data.filename,
                firstname: form.getFieldValue("firstname"),
                lastname: form.getFieldValue("lastname"),
                studentId: form.getFieldValue("id"),
                description: form.getFieldValue("description"),
                departmentId: form.getFieldValue("department"),
                teachers: form.getFieldValue("teacher")
            })
        }

        if (uploadError) {
            console.log(uploadError, "uploadError at diploma.tsx");
        }

    }, [uploadData, uploadError])

    useEffect(() => {

        if (diplomaData) {
            if (diplomaData.data.success) {
                message.success("Амжилттай хадгалагдлаа!");
                form.resetFields();
            }
            else {
                message.error("Алдаа гарлаа!");
            }
        }
        if (diplomaError) {
            message.error("Алдаа гарлаа!");
            console.log(diplomaError, "diploma error");
        }
    }, [diplomaData, diplomaError])

    return (
        <Row>
            <Col span={24} className="mt-1" >
                <Form layout="vertical" form={form} onFinish={addDiploma}  >
                    <Form.Item name="title" rules={[{ required: true, message: "Сэдвээ заавал оруулна уу" }]} label="Дипломын сэдэв" >
                        <Input placeholder="Дипломын сэдэв" />
                    </Form.Item>
                    <Row gutter={16} >
                        <Col span={6} >
                            <Form.Item name="teacher" label="Удирдагч багш сонгох" rules={[{ required: true, message: "Удирдагч багш нар" }]} >
                                <Select optionLabelProp="label" placeholder="Удирдсан багш нарыг сонгоно уу" mode="multiple" >
                                    {teachers && teachers.map((teacher: any) => <Select.Option key={teacher.id} label={`${teacher.lastname.slice(0, 3)}.${teacher.firstname}`} value={teacher.id} >{teacher.lastname.slice(0, 3)}. {teacher.firstname}</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item name="department" label="Тэнхим ээ сонгоно уу" rules={[{ required: true, message: "Тэнхим ээ сонгоно уу" }]} >
                                <Select placeholder="Тэнхим" >{departments && departments.map((department: any) => <Select.Option key={department.id} value={department.id} >{department.name}</Select.Option>)}</Select>
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item label="Бичигдсэн он" name="year" rules={[{ required: true, message: "Оноо оруулна уу" }]} >
                                <DatePicker placeholder="Он" picker="year" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item label="Файл сонгох(pdf файл оруулна уу)" name="file" rules={[{ required: true, message: "Файл заавал сонгоно уу" }]} >
                                <Input type="file" onChange={handleFile} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} >
                        <Col span={6} >
                            <Form.Item name="lastname" label="Гүйцэтгэгчийн овог" rules={[{ required: true, message: "Гүйцэтгэгчийн овгийг оруулна уу" }]} >
                                <Input placeholder="Гүйцэтгэгчийн овог" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item name="firstname" label="Гүйцэтгэгчийн нэр" rules={[{ required: true, message: "Гүйцэтгэгчийн нэрийг оруулна уу" }]} >
                                <Input placeholder="Гүйцэтгэгчийн нэр" />
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                            <Form.Item name="id" label="Гүйцэтгэгчийн оюутны код" rules={[{ required: true, message: "Гүйцэтгэгчийн оюутны код" }]} >
                                <Input placeholder="Гүйцэтгэгчийн оюутны код" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="description" label="Тайлбар" >
                        <TextArea rows={4} placeholder="Тайлбар" />
                    </Form.Item>
                    <Form.Item>
                        <Button className="primary-button" htmlType="submit" >Диплом нэмэх</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

AddDiplomaPage.getInitialProps = async (ctx: any) => {

    const cookie = new Cookies();
    let config = {
        headers: {
            "Authorization": `Bearer ${cookie.get("token_diploma")}`
        }
    }

    const departments = await axios.get("http://localhost:7000/department/get-all", config);
    const teachers = await axios.get("http://localhost:7000/teacher/get-all", config);
    console.log(departments, teachers, "fatufak")
    return {
        departments: departments,
        teachers: teachers.success ? teachers.teachers : []
    }
}

export default WithAuth(AddDiplomaPage);