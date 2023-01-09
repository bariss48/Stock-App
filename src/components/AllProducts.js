import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import StockCard from "./StockCard";

const AllProducts = () => {
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(true);

  const { userObject } = useAuth();

  const usernameArray = JSON.parse(localStorage.getItem("username"));

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await fetch(
          `http://localhost:3500/product?username=${usernameArray[0].username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.json();
        if (res.status === 201) {
          setProducts(res.body);
          setLoading(false);
        } else {
          console.log("Ürünler Getirilemedi!");
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {loading === true ? (
        <div class="flex items-center justify-center space-x-2 animate-bounce">
          <div class="w-8 h-8 bg-red-500 rounded-full"></div>
          <div class="w-8 h-8 bg-red-500 rounded-full"></div>
          <div class="w-8 h-8 bg-red-500 rounded-full"></div>
        </div>
      ) : (
        <>
          {products.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
              {products.map((item) => (
                <StockCard key={item.count} {...item} />
              ))}{" "}
            </div>
          ) : (
            <h1>Ürün Bulunamadı</h1>
          )}
        </>
      )}
    </div>
  );
};

export default AllProducts;
