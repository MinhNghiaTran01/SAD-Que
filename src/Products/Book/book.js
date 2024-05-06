import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import './book.css'
export default function Book() {
  const [result,{handleInputChange,query}] = useOutletContext();
  console.log("book", result);
  return (
    <>
      <div className="nav-container">
        <input
          className="search-input-book"
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
