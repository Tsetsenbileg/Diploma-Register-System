import { useEffect, useRef } from "react";
import { Col, Row, Typography, Divider } from "antd"
import Cookies from "universal-cookie";
import WebViewer from "@pdftron/webviewer";
import axios from "axios";
const DiplomaViewer = ({ diploma }: any) => {

    const viewer = useRef(null);
    const { Text, Title } = Typography;

    console.log(diploma, "diplomalal");

    const { department, diploma: diplom, file } = diploma;

    useEffect(() => {

        import('@pdftron/webviewer').then(() => {
            WebViewer({
                path: "/lib",
                initialDoc: "http://localhost:7000/" + diplom.file_url,
            }, viewer.current).then((instance: any) => {
                const { docViewer } = instance;
            })
        })

    }, [])
    return (
        <Row gutter={16} >
            <Col span={6} className="mt-1"   >
                <Title level={3} >Судалгааны ажлын мэдээлэл</Title>
                <div className=" p-1 " >
                    <div>
                        <Text className="color-white-bold" >Сургууль: </Text>
                        <Text  >{department.University.name}</Text>
                    </div>
                    <Divider />
                    <div>
                        <Text className="color-white-bold" >Тэнхим: </Text>
                        <Text  >{department.name}</Text>
                    </div>
                    <Divider />

                    <div  >
                        <Text className="color-white-bold" >Удирдагч багш нар : </Text>
                        {
                            diplom.teachers.map((el: any) => {
                                return (
                                    <Text key={el.Teacher.id}  >{el.Teacher.degree.slice(0, 3)} {el.Teacher.lastname.slice(0, 3)}.{el.Teacher.firstname}, </Text>
                                )
                            })
                        }
                    </div>
                    <Divider />

                    <div>
                        <Text className="color-white-bold" >Судалгааны ажлын сэдэв: </Text>
                        <Text  >{diplom.title}</Text>
                    </div>
                    <Divider />

                    <div>
                        <Text className="color-white-bold" >Тайлбар: </Text>
                        <Text  >{diplom.description}</Text>
                    </div>
                    <Divider />

                    <div>
                        <Text className="color-white-bold" >Гүйцэтгэгч: </Text>
                        <Text  >{diplom.writer_lastname.slice(0, 3)}. {diplom.writer_firstname}, {diplom.writer_stud_id} </Text>
                    </div>
                    <Divider />

                    <div>
                        <Text className="color-white-bold" >Бичигдсэн он: </Text>
                        <Text  >{diplom.written_year}</Text>
                    </div>
                    <Divider />

                    <div>
                        <Text className="color-white-bold">Хандалтын тоо: </Text>
                        <Text  >{diplom.watched_count}</Text>
                    </div>
                    <Divider />

                </div>
            </Col>
            <Col span={18} >
                <div ref={viewer} style={{ height: "100vh", width: "100%" }} ></div>
            </Col>
        </Row>
    )
}

DiplomaViewer.getInitialProps = async ({ query }: any) => {



    const diploma = await axios.get("http://localhost:7000/diplo/" + query.id);

    return {
        diploma: diploma,

    }

}

export default DiplomaViewer;