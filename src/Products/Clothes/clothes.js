import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllClothes } from "../../services/clothesService";
import './clothes.css'
export default function Clothes({handleInputChange,query}) {
  const [result] = useOutletContext();
  console.log("clothes", result);
  return (
    <>
      <div className="nav-container">
        <input
          className="search-input-clothes"
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
