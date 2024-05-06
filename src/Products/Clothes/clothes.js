import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllClothes } from "../../services/clothesService";

export default function Clothes() {
  const [products] = useOutletContext();
  console.log("clothes", products)
  return (
  <>
    <section className="card-container">
        {products?.map( (item) => {
          return item
        })}
    </section>
  </>
)
}
