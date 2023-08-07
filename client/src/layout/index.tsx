import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import logo from "@/assets/logo.svg";
import { BsGrid, BsList, BsPerson } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import Section from "@/components/layout/section";
import Container from "@/components/layout/container";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { removeUser } from "@/redux/slices/authSlices";

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
      icon: <BsGrid/>,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <BsGrid/>,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <BsGrid/>,
    },
    {
      name: "Users",
      path: "/admin/account",
      icon: <BsGrid/>,
    },
  ]

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-64 min-h-screen relative shadow-xl">
        <div className="sticky top-0">
          <div className="h-20 p-3">
            <Link to={'/'}>
              <img className="w-full object-contain h-full" src={logo} alt=""/>
            </Link>
          </div>
          <div className="p-4 space-y-4">
            {
              nav.map((item, index) => (
                <NavLink end={item.name == "Dashboard"} key={index} className={({isActive}) => `flex w-full py-2.5 px-5 text-center rounded-md items-center gap-2 duration-150 ${isActive ? 'bg-primary text-white shadow' : 'hover:bg-primary hover:text-white'}`} to={item.path}>
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

export const AccountLayout = () => {
  const nav = [
    // {
    //   name: "Trang tài khoản",
    //   path: "/account",
    // },
    {
      name: "Đơn hàng",
      path: "/account",
    },
  ]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleLogout = () => {
    dispatch(removeUser());
    toast.success('Đăng xuất thành công');
  };

  return user && (
    <>
      <Header />
        <Section>
          <Container>
            <div className="flex divide-x">
                <div className="w-1/4 space-y-5">
                  <div className="flex items-center space-x-5">
                    <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                    <p>{user.name}</p>
                  </div>
                  <ul className="divide-y uppercase font-medium">
                    {
                      nav.map((item, index) => (
                        <li key={index}><NavLink className={({isActive}) => `${isActive ? 'text-gray-700' : 'text-gray-400 hover:text-gray-700'} duration-150 p-2 w-full block`} to={item.path}>{item.name}</NavLink></li>
                      ))
                    }
                    <li onClick={()=>handleLogout()} className="text-gray-400 hover:text-gray-700 duration-150 p-2 w-full block cursor-pointer">Thoát</li>
                  </ul>
                </div>
                <div className="w-3/4 pl-8">
                  <Outlet />
                </div>
            </div>
          </Container>
        </Section>
      <Footer />
    </>
  )
}