import React, { useState } from "react";
import Spinner from "../image/spinner.gif";
import swal from "sweetalert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const addUserOnSubmit = () => {
    try {
      async function fetchPost() {
        const response = await fetch(`http://localhost:3500/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
        });
        const res = await response.json();
        if (res.status === 201) {
          swal("Başarılı!", `${res.message}`, "success").then(() => {
            setEmail("");
            setUsername("");
            setPassword("");
          });
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
                Kayıt Ol
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                onSubmit={async (event) => {
                  event.preventDefault();
                  swal({
                    title: "Kayıt Yapılıyor...",
                    text: "Lütfen Bekleyiniz",
                    icon: Spinner,
                    allowOutsideClick: false,
                  });
                  setTimeout(async () => {
                    await addUserOnSubmit();
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
                    type="text"
                    name="username"
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="baris"
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    E-Mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email@email.com"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
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
                  Kayıt Ol
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Zaten Bir Hesabınız Var Mı?{" "}
                  <a
                    href="/"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Giriş Yap
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
