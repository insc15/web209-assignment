import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountLayout, AdminLayout, DefaultLayout } from "./layout";
import PageHome from "./pages/home";
import PageShop from "./pages/shop";
import PageAdminDashboard from "./pages/admin/dashboard";
import PageAdminProducts from "./pages/admin/product";
import PageAdminCreateProducts from "./pages/admin/product/create";
import PageAdminCreateCategories from "./pages/admin/category/create";
import PageAdminCategories from "./pages/admin/category";
import PageAdminUpdateCategories from "./pages/admin/category/update";
import PageAdminUpdateProducts from "./pages/admin/product/edit";
import PageProduct from "./pages/product";
import PageSearch from "./pages/search";
import PageCheckout from "./pages/checkout";
import Login from "./pages/signin-signup/signin";
import Signup from "./pages/signin-signup/signup";
import Logout from "./pages/signin-signup/logout";
import PageAddUser from "./pages/admin/account/addUser";
import PageAccount from "./pages/account";
import PageAdminAccount from "./pages/admin/account/AdminAccountDashboard.tsx.tsx";


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />} >
        <Route index element={<PageHome />} />
        <Route path="/shop" element={<PageShop />} />
        <Route path="/product/:id" element={<PageProduct />} />
        <Route path="/search" element={<PageSearch />} />
        <Route path="/checkout" element={<PageCheckout />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
      <Route path="admin" element={<AdminLayout />} >
        <Route index element={<PageAdminDashboard />} />
        <Route path="products">
          <Route index element={<PageAdminProducts />} />
          <Route path="create" element={<PageAdminCreateProducts />} />
          <Route path=":id/update" element={<PageAdminUpdateProducts />} />
        </Route>
        <Route path="categories">
          <Route index element={<PageAdminCategories />} />
          <Route path="create" element={<PageAdminCreateCategories />} />
          <Route path="update/:id" element={<PageAdminUpdateCategories />} />
        </Route>
        <Route path="account">
          <Route index element={<PageAdminAccount />} />
          <Route path="create" element={<PageAddUser />} />
          <Route path="update/:id" element={<PageAdminUpdateCategories />} />
        </Route>
      </Route>
      <Route path="account" element={<AccountLayout/>}>
        <Route index element={<PageAccount/>}></Route>
        <Route path="login" element={<h1>Login</h1>} />
      </Route>
      <Route path="account" element={<AccountLayout/>}>
        <Route index element={<PageAccount/>}></Route>
        <Route path="login" element={<h1>Login</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App