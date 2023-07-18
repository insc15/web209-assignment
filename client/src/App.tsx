import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout, DefaultLayout } from "./layout";
import PageHome from "./pages/home";
import PageShop from "./pages/shop";
import PageAdminDashboard from "./pages/admin/dashboard";
import PageAdminProducts from "./pages/admin/product";
import PageAdminCreateProducts from "./pages/admin/product/create";

function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route index element={<PageHome />} />
          <Route path="/shop" element={<PageShop />} />
        </Route>
        <Route path="admin" element={<AdminLayout />} >
          <Route index element={<PageAdminDashboard/>} />
          <Route path="products">
            <Route index element={<PageAdminProducts/>} />
            <Route path="create" element={<PageAdminCreateProducts/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
}

export default App