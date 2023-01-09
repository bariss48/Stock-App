import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Spinner from "../image/spinner.gif";

const SpendProductForm = () => {
  const [products, setProducts] = useState([]);
  const [select, setSelected] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  let formbody = {
    date: select,
    stock: stock,
  };

  const usernameArray = JSON.parse(localStorage.getItem("username"));

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await fetch(
          `https://stockapp-api.onrender.com/product?username=${usernameArray[0].username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.json();
        if (res.status === 201) {
          const filteredArray = res.body.filter(
            (item) => item.inStock === true
          );
          setProducts(filteredArray);
        } else {
          swal("Başarısız!", `${res.message}`, "error");
        }
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function fetchPost() {
    const response = await fetch(
      `https://stockapp-api.onrender.com/product/spend`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formbody),
      }
    );
    const res = await response.json();
    if (res.status === 201) {
      swal("Başarılı!", `${res.message}`, "success");
      setSelected("");
      setStock("");
    } else {
      swal("Başarısız!", `${res.message}`, "error");
    }
  }

  const spendOnClick = async () => {
    try {
      fetchPost();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form
        class="w-full max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          swal({
            title: "Ürün Harcanıyor...",
            text: "Lütfen Bekleyiniz",
            icon: Spinner,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
          setTimeout(async () => {
            await spendOnClick().then((e) => {
              navigate("/dashboard");
              window.location.reload();
            });
          }, 2000);
        }}
      >
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Ürünü Seç
            </label>
            <div class="relative">
              <select
                id="type"
                className="border border-gray-200 rounded-lg py-3 px-4 w-full focus:outline-none ring-red-200 transition duration-500 focus:ring-4"
                value={select}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option selected={select}>Ürün Seçiniz</option>
                {products.map((element) => (
                  <option value={element.date}>
                    {element.name} ( {element.date} )
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div class="w-full px-3 pt-5">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Harcanacak Stok Sayısı
            </label>
            <input
              class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              min="0"
              placeholder="10"
              value={stock >= 0 ? stock : 0}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 buttonbackground bg-gray text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins "
          >
            Harca
          </button>
        </div>{" "}
      </form>
    </div>
  );
};

export default SpendProductForm;
