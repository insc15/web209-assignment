import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout";
import PageHome from "./pages/home";
import PageShop from "./pages/shop";

function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route index element={<PageHome />} />
          <Route path="/shop" element={<PageShop />} />
        </Route>
      </Routes>
    </BrowserRouter>
}

export default App