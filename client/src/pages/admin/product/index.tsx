import Button from "@/components/layout/button";
import Section from "@/components/layout/section";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

function PageAdminProducts() {
    return (
        <Section className="px-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold flex items-center">
                    <span className="w-1 h-6 bg-primary block mr-2"></span>
                    <span>Products</span>
                </h1>
                <Link to={'/admin/products/create'}>
                    <Button className="flex items-center">
                        <BsPlus className="text-3xl" />
                        <span className="ml-2">Thêm sản phẩm mới</span>
                    </Button>
                </Link>
            </div>
            <div className="shadow p-3 bg-white">
            
            </div>
        </Section>
    );
}

export default PageAdminProducts;