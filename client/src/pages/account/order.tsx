import currencyFormatter from "@/lib/currencyFormatter";
import { useGetOrderByUserQuery, useGetOrderQuery } from "@/redux/services/order";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PageAccountOrder() {
    const user = useSelector((state: RootState) => state.auth);
    const { data: orderData } = useGetOrderByUserQuery(user!._id);

    return (
        <table className="w-full">
            <thead className="border-b-[3px] border-gray-200">
                <tr className="uppercase">
                    <th className="py-1 text-left font-medium">Đơn hàng</th>
                    <th className="py-1 text-left font-medium">Ngày</th>
                    <th className="py-1 text-left font-medium">Tình trạng</th>
                    <th className="py-1 text-left font-medium">Tổng</th>
                    <th className="py-1 text-right font-medium">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {
                    orderData && orderData.map((order) => {
                        return (
                            <tr key={order._id} className="border-b border-gray-200">
                                <td className="py-2.5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <Link className="text-primary" to={`/order/${order._id}`}>#{order._id}</Link>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2.5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2.5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <p>{order.status}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2.5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <p><span className="font-medium">{currencyFormatter(order.total)}</span> cho {order.items.length} mục</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2.5">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex flex-col">
                                            <p>Xem</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default PageAccountOrder;