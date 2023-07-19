import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout, DefaultLayout } from "./layout";
import PageHome from "./pages/home";
import PageShop from "./pages/shop";
import PageAdminDashboard from "./pages/admin/dashboard";
import PageAdminProducts from "./pages/admin/product";
import PageAdminCreateProducts from "./pages/admin/product/create";
import Categories from "./pages/admin/Categories";
import PageAdminCreateCategories from "./pages/admin/category/create";
import PageAdminCategories from "./pages/admin/category";
import PageAdminUpdateCategories from "./pages/admin/category/update";


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />} >
        <Route index element={<PageHome />} />
        <Route path="/shop" element={<PageShop />} />

      </Route>
      <Route path="admin" element={<AdminLayout />} >
        <Route index element={<PageAdminDashboard />} />
        <Route path="products">
          <Route index element={<PageAdminProducts />} />
          <Route path="create" element={<PageAdminCreateProducts />} />
        </Route>
        <Route path="categories">
          <Route index element={<PageAdminCategories />} />
          <Route path="create" element={<PageAdminCreateCategories />} />
          <Route path="update/:id" element={<PageAdminUpdateCategories />} />
        </Route>

      </Route>
    </Routes>
  </BrowserRouter>
}

export default App