import Breadcrumb from "@/components/breadcrumb";
import Container from "@/components/layout/container";
import Section from "@/components/layout/section";
import currencyFormatter from "@/lib/currencyFormatter";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { BsCartPlus, BsDash, BsPlus } from "react-icons/bs";
import Button from "@/components/layout/button";
import { Tab } from "@headlessui/react";
import ICate from "@/interfaces/category";
import { useGetProductQuery } from "@/redux/services/product";
import { addCartItem } from "@/redux/slices/cart";
import { useDispatch } from "react-redux";

function PageProduct() {
    const { id } = useParams();
    const { data : product } = useGetProductQuery(id || "");
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addCartItem({_id: product?._id as string, quantity: quantity}))
    }

    return product && (
        <>
            <Breadcrumb title={"Chi tiết sản phẩm"} />
            <Section>
                <Container className="flex gap-5 items-stretch my-5">
                    <div className="w-1/3">
                        <div className="border-2 rounded-xl relative pt-[100%]">
                            <img src={product.image as string} className="absolute top-0 object-contain p-3" alt={`Ảnh bìa sách ${product.name}`} />
                        </div>
                    </div>
                    <div className="w-2/3">
                        <div className="border-2 rounded-xl p-3 h-full">
                            { product.stock > 0 ? <p className="bg-primary/20 text-primary px-3 py-2 rounded-full w-fit uppercase text-sm font-semibold">Còn hàng</p> : <p className="bg-red-500/20 text-red-500 px-3 py-2 rounded-full w-fit uppercase text-sm font-semibold">Hết hàng</p> }
                            <h1 className="text-2xl font-semibold my-3">{product.name}</h1>
                            <p className="text-sm text-gray-400">Tác giả: <span className="font-semibold text-gray-500">{product.author}</span></p>
                            <div className="flex gap-2 items-baseline my-5">
                                <p className="text-primary font-semibold text-2xl">{currencyFormatter(product.discount_price || product.price)}</p>
                                {product.discount_price ? <p className="text-gray-400 line-through">{currencyFormatter(product.price)}</p> : ""}
                            </div>
                            <p className="text-sm text-gray-500">{product.short_description}</p>
                            <div className="flex items-center gap-3 my-5 pb-5 pt-3 border-y flex-wrap">
                                <p className="font-semibold w-full">Số lượng</p>
                                <div className="">
                                    <div className="flex items-center bg-gray-100 w-fit rounded-full">
                                        <button onClick={()=>setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)} className="py-3 px-3 rounded-full hover:bg-gray-300 duration-150"><BsDash className="text-xl"/></button>
                                        <input onKeyUp={(e) => !/[0-9]/.test(e.key)&& e.preventDefault()} type="text" className="w-10 text-center outline-none bg-transparent py-2" value={quantity} onInput={(e)=>Number((e.target as HTMLInputElement).value) <= product.stock ? setQuantity(Number((e.target as HTMLInputElement).value)) : e.preventDefault()} />
                                        <button onClick={()=>setQuantity(quantity + 1 > product.stock ? quantity : quantity + 1)} className="py-3 px-3 rounded-full hover:bg-gray-300 duration-150"><BsPlus className="text-xl"/></button>
                                    </div>
                                </div>
                                <Button onClick={handleAddToCart} className="bg-primary hover:bg-primary/90 text-white px-5 py-3 leading-none rounded-full duration-150">
                                    <BsCartPlus className="text-lg mr-2"/>
                                    <span>Thêm vào giỏ hàng</span>
                                </Button>
                                <div className="w-full">
                                { quantity >= product.stock ? <p className="text-red-500 text-sm">Bạn đã chọn đến số lượng tối đa của sản phẩm này</p> : <p className="text-sm text-gray-500">Còn lại: <span className="font-semibold text-gray-700">{product.stock}</span></p> }
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">Danh mục: <span className="font-semibold text-gray-700">{(product.categoryId as ICate).name}</span></p>
                        </div>
                    </div>
                </Container>
                <Container className="mb-5 mt-20">
                    <Tab.Group>
                        <Tab.List className={'flex justify-center text-2xl'}>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button className={`outline-none px-5 py-3 after:duration-150 after:content-[""] after:absolute after:-bottom-[3px] relative after:h-1 after:bg-primary after:left-1/2 after:-translate-x-1/2 after:right-0 ${selected ? 'font-bold text-gray-700 after:w-[90%]' : 'after:w-0 font-semibold text-gray-400'} `} >
                                        Mô tả
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button className={`outline-none px-5 py-3 after:duration-150 after:content-[""] after:absolute after:-bottom-[3px] relative after:h-1 after:bg-primary after:left-1/2 after:-translate-x-1/2 after:right-0 ${selected ? 'font-bold text-gray-700 after:w-[90%]' : 'after:w-0 font-semibold text-gray-400'} `} >
                                        Thông tin chi tiết
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className={'border-2 rounded-xl p-10'}>
                            <Tab.Panel className={'duration-150 whitespace-break-spaces'}>{product.description}</Tab.Panel>
                            <Tab.Panel className={'duration-150'}>
                                <table className="w-full">
                                    <tbody>
                                        <tr className="odd:bg-gray-100">
                                            <td className="p-2">Tác giả</td>
                                            <td className="p-2">{product.author}</td>
                                        </tr>
                                        <tr className="odd:bg-gray-100">
                                            <td className="p-2">Nhà xuất bản</td>
                                            <td className="p-2">{product.publisher}</td>
                                        </tr>
                                        <tr className="odd:bg-gray-100">
                                            <td className="p-2">Năm xuất bản</td>
                                            <td className="p-2">{product.publishing_year}</td>
                                        </tr>
                                        <tr className="odd:bg-gray-100">
                                            <td className="p-2">Số trang</td>
                                            <td className="p-2">{product.page_num}</td>
                                        </tr>
                                        <tr className="odd:bg-gray-100">
                                            <td className="p-2">Ngôn ngữ</td>
                                            <td className="p-2">{product.language}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </Container>
            </Section>
        </>
    );
}

export default PageProduct;