import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import logo from "@/assets/logo.svg";
import { BsGrid, BsList, BsPerson } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";

export function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export function AdminLayout() {
  const nav = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <BsGrid />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <BsGrid />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <BsGrid />,
    },
    {
      name: "Order",
      path: "/admin/order",
      icon: <BsGrid />,
    },
  ]

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-64 min-h-screen relative shadow-xl">
        <div className="sticky top-0">
          <div className="h-20 p-3">
            <Link to={'/'}>
              <img className="w-full object-contain h-full" src={logo} alt="" />
            </Link>
          </div>
          <div className="p-4 space-y-4">
            {
              nav.map((item, index) => (
                <NavLink end={item.name == "Dashboard"} key={index} className={({ isActive }) => `flex w-full py-2.5 px-5 text-center rounded-md items-center gap-2 duration-150 ${isActive ? 'bg-primary text-white shadow' : 'hover:bg-primary hover:text-white'}`} to={item.path}>
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))
            }
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-100">
        {/* <header className="shadow h-20 flex justify-between items-center gap-8 px-5">
          <BsList/>
          <div className="flex justify-around items-center gap-8">
            <div>
              <input type="search" placeholder="Tìm kiếm" />
              <button className="px-2">
                <FiSearch/>
              </button>
            </div>
            <HiOutlineEnvelope />
            <BsPerson />
          </div>
        </header> */}
        <Outlet></Outlet>
      </div>
    </div>
  );
}
