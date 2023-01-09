import React from "react";
import { useAuth } from "../context/AuthProvider";
import { MdOutlineLogout } from "react-icons/md";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import Spinner from "../image/spinner.gif";
import swal from "sweetalert";

const NewSideBar = () => {
  const { open, SideBarToggle, userObject, search } = useAuth();

  const usernameArray = JSON.parse(localStorage.getItem("username"));

  const navigate = useNavigate();

  const sendLogout = () => {
    localStorage.clear();
    navigate("/");
    swal("Başarılı!", "Çıkış Başarılı", "success");
  };

  const logoutButton = (
    <button
      className="icon-button"
      title="Logout"
      onClick={async () => {
        swal({
          title: "Çıkış Yapılıyor...",
          text: "Lütfen Bekleyiniz",
          icon: Spinner,
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        setTimeout(async () => {
          await sendLogout();
        }, 2000);
      }}
    >
      <MdOutlineLogout />
      <span className="ml-1">Çıkış Yap</span>
    </button>
  );

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              onClick={SideBarToggle}
            >
              {open ? (
                <svg
                  id="toggleSidebarMobileClose"
                  className="w-6 h-6 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  id="toggleSidebarMobileHamburger"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
            <a
              href="/panel"
              className="text-xl font-bold flex items-center lg:ml-2.5"
            >
              <span className="self-center whitespace-nowrap">
                Stok Uygulaması
              </span>
            </a>
          </div>
          <Search />
          <div className="flex items-center">
            <div className="hidden lg:flex items-center">
              <div className="-mb-1">
                <span className="text-base font-normal text-gray-500 mr-5">
                  Idvlabs Task
                </span>
                <a
                  className="github-button"
                  data-color-scheme="no-preference: dark; light: light; dark: light;"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star themesberg/windster-tailwind-css-dashboard on GitHub"
                ></a>
              </div>
            </div>
            <a className="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
              {usernameArray[0].username}
            </a>
            <div className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
              {logoutButton}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NewSideBar;
