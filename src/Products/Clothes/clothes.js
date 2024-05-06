import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import './clothes.css'
export default function Clothes() {
  const [result,{handleInputChange,query}] = useOutletContext();
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
