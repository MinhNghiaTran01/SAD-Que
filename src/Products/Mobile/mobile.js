import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import './mobile.css'
export default function Mobile() {
  const [result,{handleInputChange,query}] = useOutletContext();
  console.log("mobile", result);
  return (
    <>
      <div className="nav-container">
        <input
          className="search-input-mobile"
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
