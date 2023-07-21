import { Link } from "react-router-dom";
import IProduct from "../interfaces/product";
import currencyFormatter from "@/lib/currencyFormatter";

function ListProducts({products = [], limit = 5, columns = 5, type = "row"} : {products: IProduct[], columns?: number, limit?: number, type?: "row" | "slider"}) {
    const getColumns = (columns: number) => {
        return {width: `${100 / columns}%`}
    }

    return (
        products.length > 0 ? (
            type === "row" && (
                <div className="flex flex-wrap -m-3">
                    {
                        products.slice(0, limit).map((product, index) => (
                            <div style={getColumns(columns)} className={`p-3`} key={index}>
                                <Link to={`/product/${product._id!}`} className="block shadow p-2 hover:shadow-lg duration-150 cursor-pointer h-full relative">
                                    {
                                        product.discount_price ? <span className="absolute z-10 top-4 left-0 bg-primary text-white px-2 py-1 text-xs font-semibold">-{Math.round((product.price - product.discount_price) / product.price * 100)}%</span> : ""
                                    }
                                    <div className="relative pt-[100%] overflow-hidden mb-4">
                                        <img className="absolute top-0 mx-auto h-full right-0 left-0 bottom-0 object-contain" src={product.image as string} alt={`${product.name} cover image`} />
                                    </div>
                                    <p className="uppercase font-bold text-primary text-xs">{product.author}</p>
                                    <h4 className="capitalize font-semibold text-sm">{product.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <p className="text-primary font-semibold text-lg my-2">{currencyFormatter(product.discount_price || product.price)}</p>
                                        {product.discount_price ? <p className="text-gray-400 text-sm line-through">{currencyFormatter(product.price)}</p> : ""}
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            )
        ) :
        <p>Không có sản phẩm nào</p>
    );
}

export default ListProducts;