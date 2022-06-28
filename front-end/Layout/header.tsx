import { Row, Col, Space, Image, Menu, Button, Modal, Input, message } from "antd"
import { MailOutlined } from "@ant-design/icons"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useUser } from "../Context/user"
import { useRouter } from "next/router"
import { UseApi } from "../Hooks/useApi"
import { SubmitFeedbackService } from "../Services/feedback";
const Header = () => {

    const { getAccessToken } = useUser();
    const [visible, setVisible] = useState(false);
    const { TextArea } = Input;
    const textRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const isIndex = router.pathname === "/" || router.pathname === "/admin" || router.pathname.includes('/diploma') ? true : false;

    const [{ data: feedbackData, error: feedbackError }, feedbackFetch] = UseApi({ service: SubmitFeedbackService })

    const showModal = () => {
        setVisible(true);
    }
    const handleCancel = () => {
        setVisible(false);
    }
    const handleOk = () => {

        feedbackFetch({ text: textRef.current?.resizableTextArea.props.value })
        setVisible(false);
    }

    useEffect(() => {

        if (feedbackData) {
            message.success("Амжилттай илгээгдлээ.")
        }
        if (feedbackError) {
            message.error("Алдаа гарлаа.")
        }

    }, [feedbackData, feedbackError])

    return (
        <Row>
            <Col span={24}  >
                <div className={`header-container d-flex ${isIndex ? "justify-content-space-between" : "flex-end"}`}>
                    {isIndex ? <div className="logo2">
                        <Link href="/">
                            <span  >diploma</span>
                        </Link>
                    </div> : null}


                    <div className="menu">
                        <Button onClick={showModal} className="primary" type="primary" icon={<MailOutlined />} >
                            Санал хүсэлт
                        </Button>
                        <Link href={getAccessToken() ? "/dashboard" : "/admin"} >
                            <Button className="secondary ml-1" > Aдмин</Button>
                        </Link>
                    </div>
                </div>
            </Col>
            <Modal
                title="Санал хүсэлтээ илгээнэ үү"
                visible={visible}
                okText="Илгээх"
                cancelText="Болих"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <TextArea ref={textRef} showCount maxLength={150} rows={5} placeholder="Санал хүсэлтээ бичнэ үү." />
            </Modal>
        </Row>
    )
}

export default Header