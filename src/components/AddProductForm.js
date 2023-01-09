import React, { useState } from "react";
import TextField from "./Form/TextField";
import Label from "./Form/Label";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Spinner from "../image/spinner.gif";

const AddProductForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [productImg, setProductImg] = useState("");

  const usernameArray = JSON.parse(localStorage.getItem("username"));

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  let formbody = {
    name: name,
    description: description,
    stock: stock,
  };

  async function fetchPost() {
    formbody = { ...formbody, image: productImg };
    const response = await fetch(
      `http://localhost:3500/product?username=${usernameArray[0].username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formbody),
      }
    );
    const res = await response.json();
    if (res.status === 201) {
      swal("Başarılı!", `${res.message}`, "success");
      setProductImg("");
    } else {
      swal("Başarısız!", `${res.message}`, "error");
      setProductImg("");
    }
  }

  const addOnClick = async () => {
    try {
      fetchPost();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 mt-6"
        onSubmit={async () => {
          swal({
            title: "Ürün Ekleniyor...",
            text: "Lütfen Bekleyiniz",
            icon: Spinner,
            showConfirmButton: false,
            allowOutsideClick: false,
          });
          setTimeout(async () => {
            await addOnClick().then((e) => {
              setDescription("");
              setName("");
              setStock("");
              navigate("7dashboard");
            });
          }, 2000);
        }}
      >
        <div className="flex flex-col space-y-4">
          <Label htmlFor="name" text="Ürünün İsmi" />
          <TextField
            id="name"
            type="text"
            value={name}
            placeholder="İsim"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Label htmlFor="description" text="Ürünün Açıklaması" />
          <textarea
            id="description"
            placeholder="Açıklama"
            cols="30"
            rows="9"
            className="border border-gray-200 rounded-lg py-3 px-4 w-full focus:outline-none ring-red-200 transition duration-500 focus:ring-4 resize-none"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col space-y-4">
          <Label text="Resim Yükleme" />
          <div>
            <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md bg-white font-medium text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-grey-500 focus-within:ring-offset-2 hover:text-grey-500"
                  >
                    <input
                      id="imgUpload"
                      accept="image/*"
                      type="file"
                      onChange={handleProductImageUpload}
                      required
                    />
                  </label>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF </p>
              </div>
            </div>
          </div>
          {productImg ? (
            <>
              <img src={productImg} alt="error!" style={{ height: "300px" }} />
            </>
          ) : (
            <p>Resim Yüklendiğinde Ön İzlemesi Bu Kutucuğa Düşecektir</p>
          )}

          <Label htmlFor="stock" text="Ürünün Stok Adedi" />
          <TextField
            id="stock"
            type="number"
            placeholder="10"
            min="0"
            value={stock >= 0 ? stock : 0}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 buttonbackground bg-gray text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins "
          >
            Ekle
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProductForm;
