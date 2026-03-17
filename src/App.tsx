import { Route, Routes, BrowserRouter } from "react-router-dom";
import PageHome from "@/pages/Home/Home";
import Layout from "@/pages/Layout/Layout";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PageHome />} />
          </Route>
        </Routes>
      </ThemeProvider>
      <Analytics />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
