import { useEffect, useState } from "react";
import currencyFormatter from "@/lib/currencyFormatter";
import Section from "@/components/layout/section";
import { get, update } from "../../../services/order"
import Button from "@/components/layout/button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const PageAdminOrderDelail = () => {
    const { id } = useParams()
    const [status, setStatus] = useState()
    const navigate = useNavigate();
    const [order, setOrder] = useState({})
    const [products, setProducts] = useState([])
    const onHandUpdate = async () => {
        await update(id, { ...order, status: status }).then(() => {
            navigate("/admin/order")
        })

    }
    useEffect(() => {
        get(id as string).then(({ data }) => {
            setProducts(data.products);
            setOrder(data.order)
            setStatus(data?.order?.status)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <Section className="px-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold flex items-center">
                        <span className="w-1 h-6 bg-primary block mr-2"></span>
                        <span> Order detail</span>
                    </h1>
                </div>
                {Object.keys(order).length > 0 ?
                    <div className="shadow p-10 bg-white">
                        <form className="flex flex-wrap -m-4 items-start">
                            <div className="w-6/12 p-2 flex flex-wrap mx-auto">
                                <div className="w-1/2 p-2 flex-1">
                                    <h1 className="text-center font-bold text-2xl">Order Detail</h1>
                                    <p className="mb-1">ID: <span className="font-bold">{order?._id} </span> </p>
                                    <p className="mb-1">PaymentMethod: <span className="font-bold"> {order?.paymentMethod} </span></p>
                                    <p className="mb-1">Address: <span className="font-bold"> {order?.address} </span></p>
                                    <p className="mb-1">City: <span className="font-bold"> {order?.city}</span></p>
                                    <p className="mb-1">PhoneNumber: <span className="font-bold"> {order?.phoneNumber}</span></p>
                                    <p className="mb-1">Name: <span className="font-bold"> {order?.name}</span></p>
                                    <p className="mb-1">District: <span className="font-bold">{order?.district} </span></p>
                                    <p className="mb-1">Email: <span className="font-bold">{order?.email}</span> </p>
                                    <p className="mb-1">Note: <span className="font-bold">{order?.note}</span></p>
                                    <p className="mb-1">Trạng thái:
                                        <select onChange={e => setStatus(e.target.value)}>
                                            <option value={status}>
                                                {status}
                                            </option>
                                            <option value="Pending">
                                                Pending
                                            </option>
                                            <option value="Shipping">
                                                Shipping
                                            </option>
                                            <option value="Completed">
                                                Completed
                                            </option>
                                            <option value="Cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </p>


                                </div>
                            </div>

                            <div className="w-full p-2">
                                <Button onClick={onHandUpdate} type="button" className="w-fit mx-auto">Update</Button>
                            </div>

                        </form>

                        <div className="w-1/2 px-4 py-16 mx-auto">
                            <div className="p-4 border rounded space-y-6">
                                <h2 className="font-semibold border-b-2 border-primary pb-3 w-fit text-lg">Các sản phẩm đã chọn</h2>
                                <div className="space-y-2">
                                    {
                                        products?.map((item: { _id: string, quantity: number }, index: number) => {
                                            const product = item.productId
                                            return (
                                                <div key={index} className="flex space-x-4">
                                                    <div className="w-16 h-16 border">
                                                        <img src={product.image as string} alt="" className="w-full" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <Link to={`/product/${product._id as string}`}><h3 className="text-sm font-semibold">{product.name}</h3></Link>
                                                        <div className="flex products-center space-x-2 text-sm font-medium text-gray-500">
                                                            <span className="">{currencyFormatter(product.price)}</span>
                                                            <span className="">x{item.quantity}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <h2 className="font-semibold border-b-2 border-primary pb-3 mb-3 w-fit text-lg">Tổng cộng:<span className="font-bold">{currencyFormatter(order?.priceTotal)}</span> </h2>

                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center p-3 "><Spin indicator={antIcon} /></div>
                }

            </Section>

        </div>

    )
}

export default PageAdminOrderDelail