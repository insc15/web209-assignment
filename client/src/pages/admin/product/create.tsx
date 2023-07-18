import Section from "@/components/layout/section";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    image: FileList;
}

function PageAdminCreateProducts() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    }

    useEffect(() => {
        console.log(watch("image"));
    }, [watch("image")]);

    return (
        <Section className="px-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold flex items-center">
                    <span className="w-1 h-6 bg-primary block mr-2"></span>
                    <span>Create Products</span>
                </h1>
            </div>
            <div className="shadow p-6 bg-white">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap -m-4">
                    <div className="w-1/4 p-4">
                        <div className="p-2 border-2 border-dashed relative rounded cursor-pointer hover:border-primary duration-150">
                            {
                                watch("image") && watch("image").length === 0 && (<p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-gray-500 z-10">Chọn tệp để tải lên</p>)
                            }
                            <label className="relative pt-[100%] bg-gray-100 rounded block cursor-pointer">
                                {
                                    watch("image") && watch("image").length > 0 && (
                                        <img className="absolute top-0 left-0 w-full h-full object-contain" src={URL.createObjectURL(watch("image")[0])} alt="" />
                                    )
                                }
                                <input type="file" hidden {...register("image")} />
                            </label>
                        </div>
                    </div>
                    <div className="w-3/4 p-4 flex flex-wrap gap-5">
                        <div className="w-full">
                            <p className="mb-1">Tên sản phẩm</p>
                            <input type="text" className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("name", {required: true})} />
                        </div>
                    </div>
                </form>
            </div>
        </Section>
    );
}

export default PageAdminCreateProducts;