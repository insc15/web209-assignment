import Container from "@/components/layout/container";
import Section from "@/components/layout/section";
import currencyFormatter from "@/lib/currencyFormatter";
import { useGetOrderQuery } from "@/redux/services/order";
import { Link, useParams } from "react-router-dom";
import vietnamAddress from "@/assets/vietnam_address.json"
import { ICity } from "@/interfaces/vietnamAddress";

function PageOrderReceived() {
    const { id } = useParams<{ id: string }>();
    const { data: orderData } = useGetOrderQuery( id! );
    
    const city = (vietnamAddress as ICity[]).find((item) => item.code == orderData?.city);
    const district = city?.districts.find((item) => item.id == orderData?.district);
    
    return orderData && (
        <Section>
            <Container>
                <div className="flex -mx-4">
                    <div className="w-7/12 px-4 space-y-5">
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
                                    orderData.items.map((item) => {
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
                                    <td className="py-2.5 text-right font-medium">{currencyFormatter(orderData.total)}</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2.5 font-medium">Phương thức thanh toán</td>
                                    <td className="py-2.5 text-right text-gray-500">{orderData.paymentMethod == "basc" ? 'Thanh toán qua thẻ ngân hàng' : 'Thanh toán khi nhận hàng'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 className="text-2xl font-semibold">Địa chỉ thanh toán</h2>
                        <div className="space-y-2 italic">
                            <p className="font-medium">{orderData.name}</p>
                            <p className="font-medium">{orderData.phoneNumber}</p>
                            <p className="font-medium">{orderData.address}</p>
                            <p className="font-medium">{district?.name}, {city?.name}</p>
                        </div>
                    </div>
                    <div className="w-5/12 px-4">
                        <div className="p-5 shadow border bg-stone-50">
                            <p className="text-lg font-semibold text-primary">Cảm ơn bạn, đơn hàng của bạn đã được nhận.</p>
                            <ul className="list-disc p-5 space-y-2">
                                <li>Mã đơn hàng: <span className="font-semibold">{orderData._id}</span></li>
                                <li>Ngày: <span className="font-semibold">{new Date(orderData.createdAt).toLocaleDateString()}</span></li>
                                <li>Số điện thoại: <span className="font-semibold">{orderData.phoneNumber}</span></li>
                                <li>Tổng cộng: <span className="font-semibold">{currencyFormatter(orderData.total)}</span></li>
                                <li>Phương thức thanh toán: <span className="font-semibold">{orderData.paymentMethod == "basc" ? 'Thanh toán qua thẻ ngân hàng' : 'Thanh toán khi nhận hàng'}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

export default PageOrderReceived;