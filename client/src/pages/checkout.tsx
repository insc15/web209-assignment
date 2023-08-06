import Container from "@/components/layout/container";
import Section from "@/components/layout/section";
import vietnamAddress from "@/assets/vietnam_address.json"
import { ICity, IDistrict } from "@/interfaces/vietnamAddress";
import Select, { GroupBase, SelectInstance, SingleValue } from 'react-select'
import { useForm, Controller, useWatch, SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "@/redux/services/product";
import { Link } from "react-router-dom";
import { removeCartItem } from "@/redux/slices/cart";
import currencyFormatter from "@/lib/currencyFormatter";
import { createOrder } from "@/services/order";

type FormValues = {
    name: string
    phoneNumber: string
    address: string
    city: string
    paymentMethod: string
    district: string
    note: string
    email: string
}

function PageCheckout() {
    const { register, handleSubmit, formState: { errors }, control, getValues } = useForm<FormValues>();
    const inputClass = "w-full outline-none border hover:border-gray-400 focus:border-gray-500 duration-150 rounded-sm border-gray-300 px-2 py-1.5"
    const districtRef = useRef<SelectInstance<IDistrict, false, GroupBase<IDistrict>> | null>(null)
    const cart = useSelector((state: RootState) => state.cart)
    const products = useGetProductsQuery().data
    const dispatch = useDispatch()
    const cartTotal = cart.reduce((total, item) => {
        const product = products?.find(p => p._id === item._id)
        return total + (product?.price || 0) * item.quantity
    }, 0)

    const getDistricts = (cityCode: string) => {
        if (!cityCode) return [];
        return (vietnamAddress as ICity[]).find(c => c.code === cityCode)?.districts;
    }

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        void (async () => {
            const res = await createOrder({ ...data, total: cartTotal, items: cart, userId: '64c7f6cc9bc08a5be649b815' })
            if (res && (res.data as {payUrl: string}).payUrl) {
                window.location.href = (res.data as {payUrl: string}).payUrl
            }
        })()
    }

    const city = useWatch<FormValues>({ control, name: 'city' })

    useEffect(() => {
        if (districtRef.current) {
            districtRef.current.clearValue()
        }
    }, [city])

    return cart.length > 0 ? (
        <Section>
            <Container onSubmit={(event) => void handleSubmit(onSubmit)(event)} as="form" className="z-10">
                <div className="flex -mx-4">
                    <div className="w-1/2 space-y-3 px-4">
                        <h2 className="font-semibold border-b-2 border-primary pb-3 mb-3 w-fit text-lg">Giao hàng</h2>
                        <input type="text" placeholder="Tên người nhận" className={inputClass} {...register('name', { required: 'Vui lòng nhập tên người nhận' })} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        <input type="text" placeholder="Số điện thoại" className={inputClass} {...register('phoneNumber', { required: 'Vui lòng nhập số điện thoại', pattern: { value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' } })} />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                        <input type="text" placeholder="Địa chỉ" className={inputClass} {...register('address', { required: 'Vui lòng nhập địa chỉ nhận hàng' })} />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        <input type="text" placeholder="Email" className={inputClass} {...register('email', { required: 'Vui lòng nhập Email nhận hàng', pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: 'Email không hợp lệ' } })} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        <div className="flex space-x-2">
                            <div className="w-1/2 text-gray-300 hover:text-gray-400 space-y-3">
                                <Controller
                                    control={control}
                                    name="city"
                                    render={({ field: { onChange, value, name, ref } }) => (
                                        <Select
                                            ref={ref}
                                            value={(vietnamAddress as ICity[]).find(c => c.code === value)}
                                            onChange={(selectedOption: SingleValue<ICity> | null) => onChange(selectedOption?.code)}
                                            getOptionValue={(option) => option.code}
                                            getOptionLabel={(option) => option.name}
                                            options={(vietnamAddress as ICity[])}
                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    borderColor: 'currentColor!important',
                                                    borderRadius: '0.125rem',
                                                    boxShadow: 'none'
                                                }),
                                                option: (baseStyles, { isSelected }) => ({
                                                    ...baseStyles,
                                                    backgroundColor: isSelected ? '#0b7c6b' : 'white',
                                                    cursor: 'pointer',
                                                    ":hover": {
                                                        backgroundColor: isSelected ? '#0b7c6b' : '#f5f5f5',
                                                    }
                                                }),
                                                menuPortal: base => ({ ...base, zIndex: 10 })
                                            }}
                                            name={name}
                                            menuPortalTarget={document.body}
                                            placeholder="Tỉnh/Thành phố"
                                            noOptionsMessage={() => "Không có dữ liệu"}
                                        />
                                    )}
                                    rules={{ required: 'Vui lòng chọn tỉnh/thành phố' }}
                                />
                                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                            </div>
                            <div className="w-1/2 text-gray-300 hover:text-gray-400 space-y-3">
                                <Controller
                                    control={control}
                                    name="district"
                                    render={({ field: { onChange, value, name, ref } }) => (
                                        <Select
                                            ref={(e) => { districtRef.current = e; ref(e) }}
                                            value={(getDistricts(city) as IDistrict[])?.find(c => c.id === value)}
                                            onChange={(selectedOption: SingleValue<IDistrict> | null) => onChange(selectedOption?.id)}
                                            getOptionValue={(option) => option.id}
                                            getOptionLabel={(option) => option.name}
                                            options={getDistricts(city) as IDistrict[]}
                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    borderColor: 'currentColor!important',
                                                    borderRadius: '0.125rem',
                                                    boxShadow: 'none'
                                                }),
                                                option: (baseStyles, { isSelected }) => ({
                                                    ...baseStyles,
                                                    backgroundColor: isSelected ? '#0b7c6b' : 'white',
                                                    cursor: 'pointer',
                                                    ":hover": {
                                                        backgroundColor: isSelected ? '#0b7c6b' : '#f5f5f5',
                                                    }
                                                }),
                                                menuPortal: base => ({ ...base, zIndex: 10 })
                                            }}
                                            name={name}
                                            menuPortalTarget={document.body}
                                            placeholder="Quận/Huyện"
                                            noOptionsMessage={() => "Không có dữ liệu"}

                                        />
                                    )}
                                    rules={{ required: 'Vui lòng chọn quận/huyện' }}
                                />
                                {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                            </div>
                        </div>
                        <div className="">
                            <p className="mb-2">Ghi chú đơn hàng</p>
                            <textarea rows={5} {...register('note')} placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn." className="w-full placeholder:text-sm outline-none border hover:border-gray-400 focus:border-gray-500 duration-150 rounded-sm border-gray-300 px-2 py-1.5"></textarea>
                        </div>
                        <h2 className="font-semibold border-b-2 border-primary pb-3 mb-3 w-fit text-lg">Phương thức thanh toán</h2>
                        <div className="space-y-3 font-semibold">
                            <label className="flex items-center space-x-3 w-fit cursor-pointer">
                                <input defaultChecked type="radio" {...register('paymentMethod')} defaultValue={'basc'} hidden className="peer" />
                                <span className="peer-checked:bg-primary outline outline-1 outline-offset-2 rounded-full w-3 h-3"></span>
                                <span className="text-sm">Thanh toán qua thẻ ngân hàng</span>
                            </label>
                            <label className="flex items-center space-x-3 w-fit cursor-pointer">
                                <input type="radio" {...register('paymentMethod')} defaultValue={'cod'} hidden className="peer" />
                                <span className="peer-checked:bg-primary outline outline-1 outline-offset-2 rounded-full w-3 h-3"></span>
                                <span className="text-sm">Trả tiền mặt khi nhận hàng</span>
                            </label>
                        </div>
                    </div>
                    <div className="w-1/2 px-4">
                        <div className="p-4 border rounded space-y-6">
                            <h2 className="font-semibold border-b-2 border-primary pb-3 w-fit text-lg">Các sản phẩm đã chọn</h2>
                            <div className="space-y-2">
                                {
                                    cart.map((item: { _id: string, quantity: number }, index: number) => {
                                        const product = products?.find(p => p._id == item._id)
                                        return product && (
                                            <div key={index} className="flex space-x-4">
                                                <div className="w-16 h-16 border">
                                                    <img src={product.image as string} alt="" className="w-full" />
                                                </div>
                                                <div className="flex-1">
                                                    <Link to={`/product/${product._id as string}`}><h3 className="text-sm font-semibold">{product.name}</h3></Link>
                                                    <div className="flex products-center space-x-2 text-sm font-medium text-gray-500">
                                                        <span className="">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                        <span className="">x {item.quantity}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <button onClick={() => dispatch(removeCartItem(product._id as string))} className="text-red-500 hover:text-red-600">Xoá</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <h2 className="font-semibold border-b-2 border-primary pb-3 mb-3 w-fit text-lg">Tổng cộng</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="">Tạm tính</span>
                                    <span className="font-medium">{currencyFormatter(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="">Phí giao hàng</span>
                                    <span className="font-medium">{currencyFormatter(18000)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary rounded-b p-5 w-full flex justify-between items-center">
                            <div className="">
                                <p className="text-white font-sm">Tổng cộng</p>
                                <p className="text-white font-semibold mt-1">{currencyFormatter(cartTotal + 18000)}</p>
                            </div>
                            <button type="submit" className="rounded-full px-4 py-3 hover:bg-gray-300 duration-150 bg-white text-primary">Đặt hàng</button>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    ) : (
        <Section>
            <Container className="min-h-[40vh] flex items-center justify-center flex-col space-y-4">
                <h2 className="text-xl">Chưa có sản phẩm nào trong giỏ hàng</h2>
                <Link to="/shop" className="px-4 py-2 bg-primary text-white rounded-sm">Tiếp tục mua hàng</Link>
            </Container>
        </Section>
    )
}

export default PageCheckout;