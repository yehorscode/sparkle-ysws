import { Route, Routes, BrowserRouter } from "react-router-dom";
import PageHome from "@/pages/Home/Home";
import Layout from "@/pages/Layout/Layout";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageHome />} />
        </Route>
      </Routes>
      <Analytics />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

