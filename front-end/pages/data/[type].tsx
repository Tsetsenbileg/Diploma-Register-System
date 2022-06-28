import { Col, Table, Space, PageHeader } from "antd"
import { useRouter } from "next/router";
import Cookies from "universal-cookie"
import axios from "axios"
import { DeleteOutlined } from "@ant-design/icons"
import WithAuth from "../../HOC";
const DataTable = ({ data }: any) => {

    const router = useRouter();
    const deleteItem = (itemId: any, type: any) => {
        console.log(itemId, type);
    }
    if (!data && data.length == 0) return <Col span={18} >Алдаа гарлаа</Col>;

    let columns = [];

    if (data.length > 0) {
        for (const [key, value] of Object.entries(data[0])) {

            columns.push({
                title: key,
                dataIndex: key,
                key: key,
            });

        }
        columns.push({
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space align="center" > <DeleteOutlined className="color-button" onClick={() => deleteItem(record.id, router.query.type)} /> </Space>
            )
        })
    }

    return (
        <Col span={24} className="mt-1" >
            <PageHeader title={router.query.type} />
            <Table scroll={{ x: 500, y: 700 }} bordered dataSource={data} columns={columns} />
        </Col>
    )
}

DataTable.getInitialProps = async ({ query }: any) => {

    const cookie = new Cookies();
    // let result = [];
    let config = {
        headers: {
            "Authorization": `Bearer ${cookie.get("token_diploma")}`
        }
    }

    // console.log(query, "query");
    if (query.type === "department") {
        const result = await axios.get("http://localhost:7000/department/get-all", config)
        return {
            data: result
        }
    } else if (query.type === "teachers") {
        const result = await axios.get("http://localhost:7000/teacher/get-all", config)

        if (result.success) {
            return {
                data: result.teachers
            }
        }
    } else if (query.type === "diploma") {
        const result = await axios.get("http://localhost:7000/diploma/get-all", config)
        if (result.success) {
            return {
                data: result.diplomas
            }
        }
    } else if (query.type === "feedback") {
        const result = await axios.get("http://localhost:7000/feedback/get-all", config)
        if (result.success) {
            return {
                data: result.feedbacks
            }
        }
    } else if (query.type === "admin") {

        const result = await axios.get("http://localhost:7000/users/admins", config)
        return {
            data: result
        }

    }
}

export default WithAuth(DataTable);