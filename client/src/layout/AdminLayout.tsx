import { NavLink, Outlet } from "react-router-dom"
import user from "../access/image/user.png"
import list from "../access/image/list.png"
import bookstore from "../access/image/free-book-store-logo-design.jpg"
import styles from "./AdminLayout.module.css"
import b from "../access/image/b.png"
import c from "../access/image/c.png"
import d from "../access/image/apps.png"
import e from "../access/image/7857224.png"
import f from "../access/image/3914565.png"

const AdminLayout = () => {
    return (
        <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
            <div style={{ width: 200, height: "100vh", backgroundColor: "rgba(208, 224, 199, 0.5)" }}>
                <div style={{ height: "80px" }}>
                    <img style={{ width: "100%", objectFit: "cover", height: "100%" }} src={bookstore} alt="" />
                </div>
                <div>
                    <NavLink className={styles['nav']} style={{ color: "black", width: "100%", padding: "20px", display: "flex", textAlign: "center", alignItems: "center", gap: "8px" }} to={"/admin/dashboard"}>
                        <img style={{ width: 25 }} src={d} alt="" /><img src="" alt="" />  <span>Dashboard</span>
                    </NavLink>
                    <NavLink className={styles['nav']} style={{ color: "black", width: "100%", padding: "20px", display: "flex", textAlign: "center", alignItems: "center", gap: "8px" }} to={"/admin/products"}>
                        <img style={{ width: 25 }} src={e} alt="" /><img src="" alt="" />  <span>Products</span>
                    </NavLink>
                    <NavLink className={styles['nav']} style={{ color: "black", width: "100%", padding: "20px", display: "flex", textAlign: "center", alignItems: "center", gap: "8px" }} to={"/admin/categories"}>
                        <img style={{ width: 25 }} src={f} alt="" /><img src="" alt="" />  <span>Categories</span>
                    </NavLink>
                </div>
            </div>
            <div style={{ flex: 1 }}>

                <header style={{ backgroundColor: "rgba(208, 224, 199, 0.5)", height: "80px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "30px", padding: "0px 20px 0px 20px" }}>
                    <img style={{ width: 35 }} src={list} alt="" />
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "30px" }}>
                        <div >
                            <input type="search" placeholder="Tìm kiếm" />
                            <button style={{ margin: "0px 5px" }}><img style={{ width: 15 }} src={c} alt="" /></button>
                        </div>
                        <img style={{ width: 25 }} src={b} alt="" />
                        <img style={{ width: 35 }} src={user} alt="" />
                    </div>


                </header>
                <Outlet></Outlet>
            </div>

        </div>

    )
}

export default AdminLayout