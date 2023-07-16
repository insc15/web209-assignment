import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout";
import PageHome from "./pages/home";

function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />} >
          <Route index element={<PageHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
}

export default App