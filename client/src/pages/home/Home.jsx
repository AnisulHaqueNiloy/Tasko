import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import img from "../../assets/download.png";
import Navbar from "../../components/Navbar";

const Home = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div>
      <div className="  bg-[linear-gradient(135deg,_#193B37_0%,_#0b0b0b_50%,_#193B37_100%)]">
        <Navbar></Navbar>

        {/*top banner */}
        <section className="w-11/12 mx-auto h-[176px]  flex justify-between items-center ">
          <div>
            {pathname == "/" && (
              <div className="overflow-auto">
                <p className="text-[#60E5AE] text-2xl">Hi Thomas</p>
                <h1 className="md:text-4xl text-2xl font-bold text-white">
                  Welcome to Dashboard
                </h1>
              </div>
            )}
          </div>
          <div className="w-[360px] h-[176px] overflow-hidden">
            <img
              src={img}
              alt=""
              className="
      w-full 
      h-full 
      opacity-90 
      [mask-image:linear-gradient(to_right,transparent,black)]
      [-webkit-mask-image:linear-gradient(to_right,transparent,black)]
    "
            />
          </div>
        </section>

        {/*top banner */}
      </div>
      <div className="-mt-10 z-50">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
