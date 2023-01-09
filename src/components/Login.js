import React, { useState } from "react";
import Spinner from "../image/spinner.gif";
import swal from "sweetalert";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loggedIn, setUserObject } = useAuth();
  const navigate = useNavigate();

  const navigator = () => {
    navigate("/dashboard");
  };

  const Login = () => {
    try {
      async function fetchPost() {
        const response = await fetch(`https://stockapp-api.onrender.com/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        const res = await response.json();
        if (res.status === 201) {
          swal("Başarılı!", `${res.message}`, "success").then(() => {
            setUsername("");
            setPassword("");
          });
          loggedIn();
          setUserObject(res.body);
          localStorage.setItem("username", JSON.stringify([res.body]));
          navigator();
          swal(`Hoşgeldiniz ${username}!`, `Giriş Başarılı!`, "success");
        } else {
          swal("Başarısız!", `${res.message}`, "error");
        }
        console.log(res);
      }
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Stok Uygulaması - IdvLabs Task
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Giriş Yap
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                onSubmit={async (event) => {
                  event.preventDefault();
                  swal({
                    title: "Giriş Yapılıyor...",
                    text: "Lütfen Bekleyiniz",
                    icon: Spinner,
                    allowOutsideClick: false,
                  });
                  setTimeout(async () => {
                    await Login();
                  }, 2000);
                }}
              >
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kullanıcı Adı
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="baris"
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    required=""
                  />
                </div>
                <div class="flex items-center justify-between"></div>
                <button
                  type="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Giriş Yap
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Henüz Hesabınız Yok Mu?{" "}
                  <a
                    href="/signup"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Kayıt Ol
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
