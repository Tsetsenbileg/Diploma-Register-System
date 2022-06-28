import { Card, Statistic, Button } from "antd"
import Link from "next/link";
const StatCard = ({ title, value, icon, type }: any) => {

    return (
        <Card className="ml-1" >
            <Statistic title={title} value={value} prefix={icon} />
            <Link href={"/data/" + type} >
                <Button className="mt-1 primary-button">Бүгдийг үзэх</Button>
            </Link>
        </Card>
    )
}

export default StatCard;