import { update, get } from "@/services/category";
import Button from "@/components/layout/button";
import Section from "@/components/layout/section";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type FormValues = {

    name: string;

}

function PageAdminUpdateCategories() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
    const { id } = useParams()

    const onHandUpdate = (data: FormValues) => {
        console.log(id, data.name);
        update(id, data.name)
        navigate("/admin/categories")
    }
    const [categories, setCategories] = useState()
    useEffect(() => {
        get(id).then(({ data }) => {
            setCategories(data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <Section className="px-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold flex items-center">
                    <span className="w-1 h-6 bg-primary block mr-2"></span>
                    <span>Create Categories</span>
                </h1>
            </div>
            <div className="shadow p-10 bg-white">
                <form onSubmit={handleSubmit(onHandUpdate)} className="flex flex-wrap -m-4 items-start">
                    <div className="w-6/12 p-2 flex flex-wrap mx-auto">
                        <div className="w-1/2 p-2 flex-1">
                            <p className="mb-1">Tên danh mục</p>
                            <input defaultValue={categories?.name} type="text" className="w-full border duration-150 outline-none border-gray-200 p-2 rounded focus:border-primary" {...register("name", { required: "Trường này là bắt buộc" })} />
                            {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <Button isLoading={isLoading} type="submit" className="w-fit mx-auto">Update</Button>
                    </div>
                </form>
            </div>
        </Section>
    );
}

export default PageAdminUpdateCategories;