import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";

const SideBar = () => {
  const { open, SideBarToggle } = useAuth();

  return (
    <>
      <aside
        id="sidebar"
        className={
          open
            ? "fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
            : "fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        }
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                <li>
                  <a
                    href="/dashboard"
                    className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3">Tüm Ürünler</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/product/add"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                      <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                    </svg>
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Ürün Ekle
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/product/spend"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <FaClipboardList />
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Malzeme Harca
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div
        onClick={SideBarToggle}
        className={
          open
            ? "bg-gray-900 opacity-50 fixed inset-0 z-10"
            : "bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        }
        id="sidebarBackdrop"
      ></div>
    </>
  );
};

export default SideBar;
