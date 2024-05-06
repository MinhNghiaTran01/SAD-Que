import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllClothes } from "../../services/clothesService";
import './allProducts.css'
export default function AllProducts() {
  const [result,{handleInputChange,query} ] = useOutletContext();
  console.log("all", result);
  return (
    <>
      <div className="nav-container">
        <input
          className="search-input-all"
          onChange={handleInputChange}
          value={query}
          type="text"
          placeholder="Enter your search all products"
        />
      </div>
      <section className="card-container">
        {result?.map((item) => {
          return item;
        })}
      </section>
    </>
  );
}
