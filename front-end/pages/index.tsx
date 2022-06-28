import type { NextPage } from 'next'
import { Row, Col, Form, Input, Button, List, Avatar, Space } from "antd"
import DiplomaList from '../Components/DiplomaList'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { UseApi } from '../Hooks/useApi'
import Link from 'next/link'
import { DiplomaListService } from '../Services/diploma'
import { EyeOutlined } from "@ant-design/icons"
import { SearchDiplomaService, SortedDiplomaService } from '../Services/diploma'
const Home: NextPage = ({ sorted }: any) => {

  const [{ data: diplomaData, error: diplomaError }, diplomaFetch] = UseApi({ service: DiplomaListService })
  const [{ data: searchDiplomaData, error: searchDiplomaError }, searchDiplomaFetch] = UseApi({ service: SearchDiplomaService })
  const [{ data: sortedDiplomaData, error: sortedDiplomaError }, sortedDiplomaFetch] = UseApi({ service: SortedDiplomaService })

  const [data, setData] = useState([]);


  const search = (values: any) => {
    const { searchtext } = values;

    console.log(searchtext);
    searchDiplomaFetch({ search: searchtext });

  }

  useEffect(() => {

    if (searchDiplomaData) {

      setData(searchDiplomaData.data.diplomas);
      console.log(searchDiplomaData, "search");
    }
    if (searchDiplomaError) {
      console.log(searchDiplomaError, "search error");
    }

  }, [searchDiplomaData, searchDiplomaError])


  useEffect(() => {

    if (diplomaData) {
      setData(diplomaData.data.diplomas);
    }

  }, [diplomaData, diplomaError])
  useEffect(() => {
    diplomaFetch({});
    sortedDiplomaFetch({});
  }, [])

  if (diplomaData !== null) {
    return (
      <Row gutter={32} justify="center" >
        <Col span={6}>
          <div className="recommend-header">Хамгийн их үзэгдсэн</div>
          <div className='recommend-body' >
            {sortedDiplomaData && <DiplomaList data={sortedDiplomaData.data} />}
          </div>
        </Col>
        <Col span={12} className="mt-1" >
          <div className="d-flex">
            <Form onFinish={search} layout="inline" style={{ width: "100%" }} >
              <Form.Item style={{ width: "50%" }} rules={[{ required: true, message: "Хайх утгаа оруулна уу" }]} name="searchtext"  >
                <Input placeholder='Удирдагчийн нэр, сэдвийн агуулга, сэдвийн нэр' />
              </Form.Item>
              <Form.Item >
                <Button htmlType='submit' className='primary-button ml-1 ' type='primary' >Хайх</Button>
              </Form.Item>

            </Form>

          </div>
          {
            data && <List

              dataSource={data}
              renderItem={(item: any) => (
                <List.Item actions={[<Space> <EyeOutlined /> <span>{item.watched_count}</span> </Space>, <Link href={`/diploma/${item.id}`} >Цааш үзэх</Link>]} >
                  <List.Item.Meta avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />} title={item.title} description={`${item.teachers[0].Teacher.department.University.name}, ${item.teachers.map((el: any) => {
                    return el.Teacher.degree.slice(0, 3) + " " + el.Teacher.lastname.slice(0, 3) + "." + el.Teacher.firstname + " "
                  })} `} />
                  {item.description}
                </List.Item>
              )}
            />
          }
        </Col>
      </Row>
    )
  } else {
    return null;
  }

}

// Home.getInitialProps = async () => {

//   const cookie = new Cookies();
//   // let config = {
//   //   headers: {
//   //     "Authorization": `Bearer ${cookie.get("token_diploma")}`
//   //   }
//   // }

//   const diploma = await axios.get("http://localhost:7000/sorted").then(res => res);

//   console.log(diploma, "diploma at server");

//   return {
//     sorted: diploma
//   }


// }
export default Home;
