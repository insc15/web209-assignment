import currencyFormatter from "@/lib/currencyFormatter";
import { useGetProductsQuery } from "@/redux/services/product";
import { removeCartItem } from "@/redux/slices/cart";
import { RootState } from "@/redux/store";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { BsHandbag, BsXCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function HeaderCart() {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const cartItems = useSelector((state: RootState) => state.cart)
    const { data: products } = useGetProductsQuery();
    const dispatch = useDispatch();

    const getProduct = (id: string) => {
        return products?.find((product) => product._id === id);
    };

    const handleRemoveCartItem = (id: string) => {
        dispatch(removeCartItem(id));
    };

    const handleEnter = (isOpen : boolean) => {
        !isOpen && triggerRef.current?.click()
      }
    
      const handleLeave = (isOpen : boolean) => {
          isOpen && triggerRef.current?.click()
      }

    const cartItemCount = useSelector((state: RootState) => {
        return state.cart.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    });

    return (
        <Popover >
            {({ open }) => (
            <div onMouseEnter={() => handleEnter(open)} onMouseLeave={() => handleLeave(open)}>
                <Popover.Button as={'div'} ref={triggerRef} className={'cursor-pointer'}>
                    <BsHandbag size="22" />
                    <span className="absolute top-0 right-0 rounded-full bg-gray-600 text-white p-px text-xs w-4 h-4 text-center translate-x-1/3 -translate-y-1/4 outline-white outline">{cartItemCount}</span>
                </Popover.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel className="absolute z-10 pt-2 right-0 transform w-80">
                        {
                            cartItems.length > 0 ? (
                                <div className="px-4 py-3 bg-white shadow rounded divide-y">
                                    {
                                        cartItems.map((item) => {
                                            const product = getProduct(item._id);
                                            return product && (
                                                <div className="flex items-start -mx-1 py-2 first:pt-0 last:pb-0">
                                                    <div className="w-3/12 px-1">
                                                        <Link to={`/product/${product._id as string}`}>
                                                            <img className="w-full h-full aspect-square object-contain rounded" src={product.image as string} alt="" />
                                                        </Link>
                                                    </div>
                                                    <div className="w-8/12 px-1">
                                                        <Link to={`/product/${product._id as string}`} className="block line-clamp-3 text-sm font-medium hover:text-primary text-[#333] duration-150">{product.name}</Link>
                                                        <p className="text-sm font-medium text-gray-500">
                                                            <span className="text-gray-400">{item.quantity}</span>
                                                            <span className="mx-1 text-xs text-gray-400">x</span>
                                                            <span className="">{currencyFormatter(product.price)}</span>
                                                        </p>
                                                    </div>
                                                    <div className="w-1/12 px-1 mt-3">
                                                        <BsXCircle onClick={()=>handleRemoveCartItem(item._id)} className="text-lg cursor-pointer text-[#333] duration-150 hover:text-primary"/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="flex items-center justify-center py-3">
                                        <p className="text-sm font-semibold text-gray-500 px-1">Tổng cộng:</p>
                                        <p className="text-sm font-medium px-1 text-black">{currencyFormatter(cartItems.reduce((total, item) => total + item.quantity * (getProduct(item._id)?.price as number), 0))}</p>
                                    </div>
                                    <div className="flex items-center justify-center py-3">
                                        <Link to="/cart" className="w-full text-center bg-primary hover:bg-button-hover duration-150 text-white rounded py-2 px-4 text-sm font-medium">Xem giỏ hàng</Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="px-4 py-6 bg-white shadow rounded divide-y text-center">
                                    <p>Chưa có sản phẩm trong giỏ hàng.</p>
                                </div>
                            )
                        }
                    </Popover.Panel>
                </Transition>
            </div>
            )}
        </Popover>
    );
}

export default HeaderCart;