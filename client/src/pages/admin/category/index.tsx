import { getAll, remove } from "@/services/category";
import Button from "@/components/layout/button";
import Section from "@/components/layout/section";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

function PageAdminCategories() {
    const [category, setCategory] = useState()
    useEffect(() => {
        getAll().then(({ data }) => {
            setCategory(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    console.log(category);
    const handRemove = (id: string) => {
        if (window.confirm('Bạn có chắc muốn xóa không')) {
            remove(id).then(() => {
                getAll().then(({ data }) => {
                    setCategory(data);
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
        }

    }
    return (
        <Section className="px-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold flex items-center">
                    <span className="w-1 h-6 bg-primary block mr-2"></span>
                    <span>Categories</span>
                </h1>
                <Link to={'/admin/categories/create'}>
                    <Button className="flex items-center">
                        <BsPlus className="text-3xl" />
                        <span className="ml-2">Thêm sản danh mục</span>
                    </Button>
                </Link>
            </div>
            <div className="shadow p-3 bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {category?.map((item: any, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to={`/admin/categories/update/${item._id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Update
                                    </button></Link>
                                    <button onClick={() => handRemove(item._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </Section>
    );
}

export default PageAdminCategories;