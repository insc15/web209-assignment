import Container from "@/components/layout/container";
import Section from "@/components/layout/section";
import currencyFormatter from "@/lib/currencyFormatter";
import { useGetOrderQuery } from "@/redux/services/order";
import { Link, useParams } from "react-router-dom";
import vietnamAddress from "@/assets/vietnam_address.json"
import { ICity } from "@/interfaces/vietnamAddress";
import Button from "@/components/layout/button";
import instance from "@/services/instance";

function PageOrderDetail() {
    const { id } = useParams<{ id: string }>();
    const { data: order } = useGetOrderQuery(id!) 

    const city = (vietnamAddress as ICity[]).find((item) => item.code == order?.city);
    const district = city?.districts.find((item) => item.id == order?.district);

    const handleInitPayment = async () => {
        if(order){
            const { data } = await instance.post<{payUrl: string | null}>(`/api/order/${order._id}/pay`)
            if(data.payUrl){
                window.location.href = data.payUrl
            }
        }
    }

    return order ? (
        <Section>
            <Container>
                <div className="space-y-5">
                    <h1 className="text-2xl font-semibold">Chi tiết đơn hàng</h1>
                    <table className="w-full">
                        <thead className="border-b-[3px] border-gray-200">
                            <tr className="uppercase">
                                <th className="py-1 text-left font-medium">Sản phẩm</th>
                                <th className="py-1 text-right font-medium">Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.items.map((item) => {
                                    return (
                                        <tr key={item._id} className="border-b border-gray-200">
                                            <td className="py-2.5">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex flex-col">
                                                        <div className="space-x-2"><Link className="text-primary" to={`/product/${item.productId._id as string}`}>{item.productId.name}</Link><span className="font-medium">x {item.quantity}</span></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2.5 text-right font-medium">{currencyFormatter(item.productId.price * item.quantity)}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="border-b border-gray-200">
                                <td className="py-2.5 font-medium">Tổng</td>
                                <td className="py-2.5 text-right font-medium">{currencyFormatter(order.total)}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2.5 font-medium">Phương thức thanh toán</td>
                                <td className="py-2.5 text-right text-gray-500">{order.paymentMethod == "basc" ? 'Thanh toán qua thẻ ngân hàng' : 'Thanh toán khi nhận hàng'}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="py-2.5 font-medium">Tình trạng đơn hàng</td>
                                <td className="py-2.5 text-right">{order.status}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 className="text-2xl font-semibold">Địa chỉ thanh toán</h2>
                    <div className="space-y-2 italic">
                        <p className="font-medium">{order.name}</p>
                        <p className="font-medium">{order.phone}</p>
                        <p className="font-medium">{order.address}</p>
                        <p className="font-medium">{district?.name}, {city?.name}</p>
                    </div>
                    {
                        order.paymentMethod == "basc" && order.status.toLowerCase() == "pending" && <Button onClick={() => void handleInitPayment()}>Thanh toán</Button>
                    }
                </div>
            </Container>
        </Section>
    ):(
        <Section>
            <Container>
                <h1 className="text-2xl font-semibold">Đơn hàng không tồn tại</h1>
            </Container>
        </Section>
    )
}

export default PageOrderDetail;