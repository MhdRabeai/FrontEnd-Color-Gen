import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loader";

const Root = () => {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="  relative bg-[#000] min-h-screen  dark font-mono">
      <Navbar />
      <Suspense fallback={<Loading />}>
        {isLoading ? <Loading /> : <Outlet />}
      </Suspense>
    </div>
  );
};

export default Root;
