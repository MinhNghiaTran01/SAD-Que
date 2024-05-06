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

export function search(products, setProducts, queryAll) {
  return <div>search</div>;
}

// const fetchSearch = async () => {
//   console.log("this is in search");
//   const res = await getAllClothes(

//     `${selectedProduct.toLowerCase()}search/${selectedProduct.toLowerCase()}/search?name=${query}`
//   );
//   console.log("response query search: " + res);
//   let clothesFilter = [];
//   res.forEach((clothes) => {
//     clothesFilter.push(clothes);
//   });
//   setProducts(clothesFilter);
// };
