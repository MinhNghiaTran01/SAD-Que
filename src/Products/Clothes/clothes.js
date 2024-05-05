import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAllClothes } from "../../services/clothesService";

export default function Clothes() {
  const [result] = useOutletContext();
  return (
    <>
      <section className="card-container">
          {result.map( (item) => {
            return item
          })}
      </section>
    </>
  );
}
