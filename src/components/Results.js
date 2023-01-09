import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StockCard from "./StockCard";
import UpperSideBar from "./UpperSideBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthProvider";

export const Results = () => {
  //const [results, setResults] = useState("");
  //const { name } = useParams();
  //const [handleParams, setHandleParams] = useState(`${name}`);

  const { results } = useAuth();

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
                <h1 className="text-2xl poppins text-gray-700">
                  Arama Sonuçları
                </h1>
              </div>
              <div>
                {results.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
                    {results.map((item) => (
                      <StockCard key={item.count} {...item} />
                    ))}{" "}
                  </div>
                ) : (
                  <h1>Ürün Bulunamadı</h1>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Results;
