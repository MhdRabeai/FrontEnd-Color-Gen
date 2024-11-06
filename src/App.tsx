import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Root from "./pages/Root";

const ByCode = lazy(() => import("./pages/ByCode"));
const History = lazy(() => import("./pages/History"));
const Home = lazy(() => import("./pages/Home"));
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="palettes" element={<History />} />
        <Route path="palettes/:code" element={<ByCode />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default App;
