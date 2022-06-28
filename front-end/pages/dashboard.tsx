import WithAuth from "../HOC";
import { Row, Col, Statistic, Card, Button } from "antd"
import axios from "axios";
import { NextPage } from "next";
import Cookies from "universal-cookie";
import { DatabaseOutlined, TeamOutlined, FileTextOutlined, MailOutlined } from "@ant-design/icons"
import StatCard from "../Components/StatisticCard";
import { useUser } from "../Context/user";


interface Props {
    departments?: any;
    teachers?: any;
    diploma?: any
    feedbacks?: any
}

const DashboardPage: NextPage<Props> = ({ departments, teachers, diploma, feedbacks, admins }) => {


    const { getRole } = useUser();

    const isSuper = getRole() === "super";

    if (!(departments && teachers)) return <Col span={18} >Oops! Something went wrong</Col>
    return (
        <Col span={18} className="mt-1" >
            <div className="d-flex" >
                {!isSuper && <StatCard title="Нийт тэнхим" type="department" icon={<DatabaseOutlined />} value={departments.length} />}
                {!isSuper && <StatCard title="Нийт багш нар" type="teachers" value={teachers.teachers.length} icon={<TeamOutlined />} />}
                {!isSuper && <StatCard title="Нийт диплом" type="diploma" value={diploma} icon={<FileTextOutlined />} />}
                {isSuper && <StatCard title="Нийт санал хүсэлтүүд" type="feedback" value={feedbacks} icon={<MailOutlined />} />}
                {isSuper && <StatCard title="Нийт админ" type="admin" value={admins} icon={<TeamOutlined />} />}
            </div>
        </Col>
    )
}

DashboardPage.getInitialProps = async () => {


    const cookie = new Cookies();
    let config = {
        headers: {
            "Authorization": `Bearer ${cookie.get("token_diploma")}`
        }
    }

    const departments = await axios.get("http://localhost:7000/department/get-all", config);
    const teachers = await axios.get("http://localhost:7000/teacher/get-all", config);
    const diploma = await axios.get("http://localhost:7000/diploma/count", config);
    const feedbacks = await axios.get("http://localhost:7000/feedback/count", config);
    const admins = await axios.get('http://localhost:7000/users/admin-count', config);
    return {
        diploma: diploma,
        departments: departments,
        teachers: teachers,
        feedbacks: feedbacks,
        admins: admins
    }
}

export default WithAuth(DashboardPage);