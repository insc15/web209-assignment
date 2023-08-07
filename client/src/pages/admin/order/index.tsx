
import Section from "@/components/layout/section";
import { getAll } from "@/services/order";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PageAdminOrder = () => {
    const [order, setOrder] = useState([])
    useEffect(() => {
        getAll().then(({ data }) => {
            console.log(data);

            setOrder(data);
        }).catch((err) => {
            console.log(err);
        })

    }, [])
    return (
        <Section className="px-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold flex items-center">
                    <span className="w-1 h-6 bg-primary block mr-2"></span>
                    <span>Order</span>
                </h1>
            </div>
            <div className="shadow p-3 bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Đơn hàng
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>

                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tổng
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {order.length > 0 ? order?.map((item: any, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.createdAt}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.priceTotal}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">

                                    <Link to={`/admin/order/detail/${item._id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        detail
                                    </button></Link>
                                </td>
                            </tr>
                        )) : <div className="flex justify-center items-center p-3 "><Spin indicator={antIcon} /></div>}

                    </tbody>
                </table>
            </div>
        </Section>
    )
}

export default PageAdminOrder