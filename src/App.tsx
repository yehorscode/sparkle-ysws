import { Route, Routes, BrowserRouter } from "react-router-dom";
import PageHome from "@/pages/Home/Home";
import Layout from "@/pages/Layout/Layout";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorPage from "@/pages/Error/Error";
import { SpeedInsights } from "@vercel/speed-insights/react";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider storageKey="vite-ui-theme" defaultTheme="light">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PageHome />} />
            <Route path="/error" element={<ErrorPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
