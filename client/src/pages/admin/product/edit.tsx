import Button from "@/components/layout/button";
import Section from "@/components/layout/section";
import ICate from "@/interfaces/category";
import IProduct from "@/interfaces/product";
import { getAll } from "@/services/category";
import { getProduct, updateProduct } from "@/services/product";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"

type FormValues = {
    image: string | FileList;
    name: string;
    price: number;
    discount_price?: number;
    short_description?: string;
    categoryId: string;
    stock: number;
    author: string;
    description: string;
    publisher?: string;
    page_num?: number;
    publishing_year?: number;
    language?: string;
}

function PageAdminUpdateProducts() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [categories, setCategories] = useState<ICate[]>([]);
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormValues>();
    const navigator = useNavigate();

    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        if(product && product._id){
            
            const formData = new FormData();

            Object.keys(data).forEach(key => {
                const value = data[key as keyof FormValues];
                if(typeof value === "string") {
                    if(key === "discount_price" && value.length === 0){
                        formData.append(key, '0');
                    }else{
                        formData.append(key, value);
                    }
                }else if(typeof value === "number") {
                    formData.append(key, value.toString());
                }else if(typeof value === "object") {
                    formData.append(key, value[0]);
                }
            });

            setIsLoading(true);

            try {
                await updateProduct(product._id, formData);
                toast.success("Sửa sản phẩm thành công")
                setTimeout(() => {
                    navigator("/admin/products");
                }, 1000);
            } catch (error) {
                toast.error("Sửa sản phẩm thất bại")
            }

            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(id){
            const fetchCategories = async () => {
                const { data } = await getAll();
                setCategories(data);
            }

            const fetchProduct = async () => {
                const { data } = await getProduct(id);
                if(data) {
                    setProduct(data);

                    setValue("name", data?.name);
                    setValue("image", data?.image);
                    setValue("price", data?.price);
                    setValue("discount_price", data?.discount_price);
                    setValue("short_description", data?.short_description);
                    setValue("categoryId", (data?.categoryId as ICate)._id);
                    setValue("stock", data?.stock);
                    setValue("author", data?.author);
                    setValue("description", data?.description);
                    setValue("publisher", data?.publisher);
                    setValue("page_num", data?.page_num);
                    setValue("publishing_year", data?.publishing_year);
                    setValue("language", data?.language);
                }
            }

            void fetchCategories();
            void fetchProduct();
        }
    }, [id, setValue])

    return (
        <Section className="px-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold flex items-center">
                    <span className="w-1 h-6 bg-primary block mr-2"></span>
                    <span>Sửa sản phẩm</span>
                </h1>
            </div>
            <div className="shadow p-10 bg-white">
                <form onSubmit={(event) =>void handleSubmit(onSubmit)(event)} className="flex flex-wrap -m-4 items-start">
                    <div className="w-8/12 p-2 flex flex-wrap">
                        <div className="w-1/2 p-2">
                            <p className="mb-1">Tên sản phẩm</p>
                            <input type="text" className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("name", {required: "Trường này là bắt buộc"})} />
                            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                        </div>
                        <div className="w-1/2 p-2">
                            <p className="mb-1">Danh mục</p>
                            <select className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("categoryId", {required: "Trường này là bắt buộc"})}>
                                {
                                    categories.map((cate) => (
                                        <option key={cate._id} value={cate._id}>{cate.name}</option>
                                    ))
                                }
                            </select>
                            {errors.categoryId && <span className="text-red-500 text-sm mt-1">{errors.categoryId.message}</span>}
                        </div>
                        <div className="w-1/2 p-2">
                            <p className="mb-1">Giá</p>
                            <input type="number" min={0} className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("price", {required: "Trường này là bắt buộc", pattern: {value: /^[0-9]*$/, message: "Chỉ được phép nhập số"}, min: {value: 0, message: "Chỉ được phép nhập số dương"}})} />
                            {errors.price && <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>}
                        </div>
                        <div className="w-1/2 p-2">
                            <p className="mb-1">Giá khuyến mãi</p>
                            <input type="number" min={0} className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("discount_price", {pattern: {value: /^[0-9]*$/, message: "Chỉ được phép nhập số"}, min: {value: 0, message: "Chỉ được phép nhập số dương"}})} />
                            {errors.discount_price && <span className="text-red-500 text-sm mt-1">{errors.discount_price.message}</span>}
                        </div>
                        <div className="w-1/3 p-2">
                            <p className="mb-1">Số lượng sản phẩm</p>
                            <input type="number" min={0} className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("stock", {required: "Trường này là bắt buộc", pattern: {value: /^[0-9]*$/, message: "Chỉ được phép nhập số"}, min: {value: 0, message: "Chỉ được phép nhập số dương"}})} />
                            {errors.stock && <span className="text-red-500 text-sm mt-1">{errors.stock.message}</span>}
                        </div>
                        <div className="w-1/3 p-2">
                            <p className="mb-1">Tác giả</p>
                            <input type="text" className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("author", {required: "Trường này là bắt buộc"})} />
                            {errors.author && <span className="text-red-500 text-sm mt-1">{errors.author.message}</span>}
                        </div>
                        <div className="w-1/3 p-2">
                            <p className="mb-1">Nhà xuất bản</p>
                            <input type="text" className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("publisher")} />
                        </div>
                        <div className="w-1/3 p-2">
                            <p className="mb-1">Số trang</p>
                            <input type="number" min={0} className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("page_num")} />
                        </div>
                        <div className="w-1/3 p-2">
                            <p className="mb-1">Năm xuất bản</p> 
                            <input type="number" min={0} className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("publishing_year")} />
                        </div>
                        <div className="w-1/3 p-2">
                            <p className="mb-1">Ngôn ngữ</p>
                            <input type="text" className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("language")} />
                        </div>
                        <div className="w-full p-2">
                            <p className="mb-1">Mô tả ngắn</p>
                            <textarea rows={3} className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("short_description")} />
                        </div>
                        <div className="w-full p-2">
                            <p className="mb-1">Mô tả chi tiết</p>
                            <textarea rows={5} className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("description", {required: "Trường này là bắt buộc"})} />
                            {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
                        </div>
                        <div className="w-full p-2">
                            <Button isLoading={isLoading} type="submit" className="w-full">Sửa sản phẩm</Button>
                        </div>
                    </div>
                    <div className="w-4/12 p-4">
                        <div className={`p-2 border-2 border-dashed relative rounded cursor-pointer ${errors.image ? 'border-red-500' : 'hover:border-primary'} duration-150`}>
                            {
                                (!watch("image") || watch("image").length == 0) && (<p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-500 z-10">Chọn tệp để tải lên</p>)
                            }
                            <label className="relative pt-[100%] bg-gray-100 rounded block cursor-pointer">
                                {
                                    watch("image") && watch("image").length > 0 && (
                                        <img className="absolute top-0 left-0 w-full h-full object-contain" src={typeof watch('image') == 'string' ? watch('image') as string : URL.createObjectURL((watch("image") as FileList)[0] )} alt="" />
                                    )
                                }
                                <input type="file" hidden {...register("image")} />
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </Section>
    );
}

export default PageAdminUpdateProducts;