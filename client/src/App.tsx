import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import ClientLayout from './layout/ClientLayout'
import HomePages from './pages/HomePages'
import AdminLayout from './layout/AdminLayout'
import DashBoard from './pages/admin/DashBoard'
import ProductsList from './pages/admin/ProductsList'
import Categories from './pages/admin/Categories'

function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: <ClientLayout></ClientLayout>, children: [
        { path: "/", element: <HomePages></HomePages> },
        // { path: "/add", element:  },
      ]
    },
    {
      path: "/admin", element: <AdminLayout></AdminLayout>, children: [
        { path: '', element: <DashBoard></DashBoard> },
        { path: "dashboard", element: <DashBoard></DashBoard> },
        { path: "products", element: <ProductsList></ProductsList> },
        { path: "categories", element: <Categories></Categories> },
        // { path: "/add", element:  },
      ]
    },
  ])
  return <RouterProvider router={router} />
}

export default App