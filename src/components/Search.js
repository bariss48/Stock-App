import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../image/spinner.gif";
import swal from "sweetalert";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const { setResults } = useAuth();

  const searchHandler = async (e) => {
    e.preventDefault();
    swal({
      title: "Ürün veya Ürünler Aranıyor...",
      text: "Lütfen Bekleyiniz",
      icon: Spinner,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2400,
    });
    setTimeout(async () => {
      await fetchData();
    }, 2000);
    if (keyword.trim()) {
      navigate(`/dashboard/search/${keyword}`);
    } else {
      navigate("/dashboard");
    }
  };

  async function fetchData() {
    const response = await fetch(
      `http://localhost:3500/product/search?productname=${keyword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    if (res.status === 201) {
      setResults(res.body);
    } else {
      console.log("Aranan Ürün Bulunamadı!");
    }
  }

  return (
    <form className="form-inline my-0 my-lg-0 border" onSubmit={searchHandler}>
      <input
        className="form-control mr-sm-2"
        type="text"
        id="search_field"
        placeholder="Ara"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit">
        <span class="search-icon">
          <svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25">
            <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path>
          </svg>
        </span>
      </button>
    </form>
  );
};

export default Search;
