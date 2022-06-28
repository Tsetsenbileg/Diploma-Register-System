import Header from "./header"
import Sidebar from "./sidebar"
import { Row, Col } from "antd"
import { useUser } from "../Context/user"
import { useRouter } from "next/router"
const Layout = ({ children }: any) => {

    const { getAccessToken } = useUser();
    const router = useRouter();
    const isAdmin = getAccessToken() ? true : false;
    const isClient = router.pathname === "/" || router.pathname.includes("diploma") ? true : false;
    // console.log(router.pathname, "router");
    return (
        <>
            <Row justify="center" >
                {isAdmin && !isClient ? <Col span={3} ><Sidebar /></Col> : null}
                <Col span={isAdmin && !isClient ? 21 : 24} >
                    <Row>
                        <Col span={24} >
                            <Header />
                        </Col>
                    </Row>
                    <Row justify="center" >
                        <Col span={22} >
                            {children}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24} >
                    <Footer />
                </Col>
            </Row>
        </>
    )
}

const Footer = () => {

    return (
        <div className="d-flex color-white justify-content-space-between bg-primary p-1" >
            <div>Холбоо барих: +976 88508688</div>
            <div> Бакалаврын судалгааны ажил, 2022 он. </div>
        </div>
    )
}

export default Layout;