import React from "react";
import UpperSideBar from "./UpperSideBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import AddProductForm from "./AddProductForm";

const AddProductScreen = () => {
  return (
    <div>
      <UpperSideBar />
      <div className="flex overflow-hidden bg-white pt-16">
        <SideBar />
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="col-span-4 my-10 px-6">
              {" "}
              <div className="flex flex-col space-y-2">
                <h1 className="text-2xl poppins text-gray-700">Ürün Ekleme</h1>
              </div>
              <AddProductForm />{" "}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AddProductScreen;
