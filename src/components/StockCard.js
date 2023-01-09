import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Spinner from "../image/spinner.gif";
import swal from "sweetalert";

const StockCard = ({ _id, name, description, image, stock, date, inStock }) => {
  const navigate = useNavigate();
  //const { namee } = useParams();
  const location = useLocation();

  const path = location.pathname;

  let splittedUrl = path.split("/");

  if (path.includes("search")) {
    splittedUrl = splittedUrl[1];
  } else {
    splittedUrl = "dashboard";
  }

  const navigateRoute = () => {
    navigate(`/${splittedUrl}/product/${_id}`);
  };

  const navigateToDashboard = () => {
    navigate(`/dashboard`);
  };

  async function fetchPost() {
    const response = await fetch(
      `https://stockapp-api.onrender.com/product?productId=${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    if (res.status === 201) {
      swal("Başarılı!", `${res.message}`, "success").then(() => {
        navigateToDashboard();
        window.location.reload();
      });
    } else {
      swal("Başarısız!", `${res.message}`, "error");
    }
  }

  const deleteOnClick = async () => {
    try {
      swal({
        title: "Ürünü Silmek İstediğinizden Emin Misiniz?",
        text: "Bu Değişiklik Geri Alınamamaktadır!",
        buttons: {
          cancel: "Silme",
          catch: {
            text: "Sil",
            value: "catch",
          },
        },
      }).then((value) => {
        switch (value) {
          case "catch":
            swal({
              title: "Ürün  Siliniyor...",
              text: "Lütfen Bekleyiniz",
              icon: Spinner,
            });
            setTimeout(async () => {
              await fetchPost();
            }, 1500);
            break;
          default:
            swal("Uyarı!", "Ürün Silinemedi!", "info");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {
        <div className="border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
          <span
            className={
              inStock
                ? "bg-red-50 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 "
                : "bg-white border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 "
            }
          >
            {inStock === true ? "Stokta Var" : "Stokta Yok"}
          </span>
          <img
            className="w-64 mx-auto transform transition duration-300 hover:scale-105"
            src={image}
            alt=""
          />
          <div className="flex flex-col items-center my-3 space-y-2">
            <h1 className="text-gray-900 poppins text-lg">{name}</h1>
            <h2 className="text-gray-900 poppins text-0.5xl font-bold">
              Stok Sayısı: {stock}
            </h2>
            <p className="text-gray-500 poppins text-sm text-center">{date}</p>
            <button
              onClick={navigateRoute}
              className="bg-gray-200 text-gray-600 px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
            >
              Düzenle
            </button>
            <button
              onClick={deleteOnClick}
              className="bg-gray-200 text-gray-600 px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default StockCard;
