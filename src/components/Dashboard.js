import React from "react";
import { useAuth } from "../context/AuthProvider";
import UpperSideBar from "./UpperSideBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import AllProducts from "./AllProducts";

const Dashboard = () => {
  const { userObject } = useAuth();

  return (
    <>
      <div>
        <UpperSideBar />
        <div className="flex overflow-hidden bg-white pt-16">
          <SideBar />
          <div
            id="main-content"
            className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <main>
              <div className="col-span-4 my-24 px-6">
                {" "}
                <AllProducts />{" "}
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
