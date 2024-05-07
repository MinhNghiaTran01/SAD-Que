import React from "react";
import { getAllClothes } from "../../services/clothesService";
import { getAllMobile } from "../../services/mobileService";
import { getAllBook } from "../../services/bookService";

export function searchAll(setProductsAll, queryAll) {
  const fetchSearchAll = async () => {
    const filterBook = await getAllBook(
      `8000/booksearch/book/search?name=${queryAll}`
    );
    const filterClothes = await getAllClothes(
      `8001/clothessearch/clothes/search?name=${queryAll}`
    );

    const filterMobile = await getAllMobile(
      `8002/mobilesearch/mobile/search?name=${queryAll}`
    );

    console.log(filterBook)

    setProductsAll([...filterClothes, ...filterBook, ...filterMobile]);
  };

  fetchSearchAll();
  return <div>searchAll</div>;
}

export function search(setProducts, query,selectedProduct) {

  console.log(selectedProduct)
  let port = 8000
  if(selectedProduct==="clothes"){
    port = 8001
  }
  else if(selectedProduct==="mobile"){
    port = 8002
  }

  const fetchSearch= async () => {
    const filter = await getAllBook(
      `${port}/${selectedProduct}search/${selectedProduct}/search?name=${query}`
    );
    setProducts(filter)
  }
  fetchSearch();
}
