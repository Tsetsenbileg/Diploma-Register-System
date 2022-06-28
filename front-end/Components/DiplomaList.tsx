import { ArrowLeftOutlined, EyeOutlined, RightOutlined } from "@ant-design/icons";
import { Typography, Button } from "antd"
import Link from "next/link";

const DiplomaList = ({ data }: any) => {

    // if (data) {
    return (
        <>
            {data.map((diploma: any) => {
                return <DiplomaCard key={diploma.id} data={diploma} />
            })}
        </>
    )
    // }

}

const DiplomaCard = ({ data }: any) => {

    const { Title, Paragraph, Text } = Typography;
    return (
        <div className="diploma-card" >
            <Title level={4}>{data.title}</Title>
            <Paragraph italic ellipsis={{ rows: 2, expandable: true }} >{data.description}</Paragraph>
            {/* <div className="d-flex justify-content-space-between" > */}
            <div>
                <Text type="secondary" >Удирдагч багш: </Text>
                {data.teachers.map((t: any) => {
                    return (
                        <Text key={t.Teacher.id}>{t.Teacher.lastname.slice(0, 3)} {t.Teacher.firstname}, </Text>
                    )
                })}
            </div>
            <div>
                <Text type="secondary" >Гүйцэтгэсэн оюутан: </Text>
                <Text>{data.writer_lastname.slice(0, 3)}.{data.writer_firstname}</Text>
            </div>
            <div>
                <Text type="secondary" >Он: </Text>
                <Text>{data.written_year}</Text>
            </div>
            <div className="d-flex justify-content-space-between " >
                <div>
                    <EyeOutlined /> &nbsp;
                    <Text>{data.watched_count}</Text>
                </div>
                <div  >
                    <Link href={`/diploma/${data.id}`} >
                        <Button style={{ border: "1px solid #f64c72", color: "#f64c72" }} shape="circle" icon={<RightOutlined />} />
                    </Link>
                </div>
            </div>
            {/* <div style={{ float: "left" }} >
                <Button icon={<ArrowLeftOutlined />} />
            </div> */}
            {/* </div> */}
        </div>
    )

}

export default DiplomaList;