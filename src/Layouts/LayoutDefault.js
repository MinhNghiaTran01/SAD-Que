/* eslint-disable no-unused-vars */
import { Layout, Flex, Button, Image, Table } from "antd";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Card from "../components/Card";
import Navigation from "../Navigation/Nav";
import { useEffect, useState } from "react";
import products from "../db/data";
import Recommended from "../Recommended/Recommended";
import Products from "../Products/Products";
import "./index.css";
import { getAllProduct } from "../services/productService";
import { getAllClothes } from "../services/clothesService";
import Search from "antd/es/transfer/search";
import { searchAll } from "../utils/Search/search";
const { Sider, Content, Header } = Layout;

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// lọc search
async function filteredData(
  products,
  selectedCategory,
  selectedProduct,
  setProducts
) {
  console.log("on function filteredData");
  let filteredProducts = products;

  const fetchClothesByCategoryId = async () => {
    let res = [];
    if (selectedCategory?.name === "All") {
      try {
        // Assuming getAllClothes returns a Promise
        res = await getAllClothes(
          `${selectedProduct.toLowerCase()}infor/${selectedProduct.toLowerCase()}`
        );
        console.log("response query clothes by all: " + res);

        let clothesFilter = [];
        filteredProducts.forEach((item) => {
          res.forEach((clothes) => {
            if (clothes.id === item.id) {
              clothesFilter.push(clothes);
            }
          });
        });
        filteredProducts = clothesFilter;
      } catch (error) {
        console.error("Failed to fetch clothes:", error);
        // Handle errors or fallback logic here
      }
    } else {
      res = await getAllClothes(
        `${selectedProduct?.toLowerCase()}search/${selectedProduct.toLowerCase()}/search?categoryId=${
          selectedCategory.id
        }`
      );

      console.log("response query clothes by category: " + res);

      let clothesFilter = [];
      console.log("this is in by category: ", filteredProducts);
      res.forEach((clothes) => {
        clothesFilter.push(clothes);
      });

      setProducts(clothesFilter);
    }
  };
  filteredProducts = await fetchClothesByCategoryId();
}

function LayoutDefault() {
  const navigate = useNavigate();
  // const { showBoundaryOfEffect } = useErrorBoundary();
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedType, setSelectedType] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("clothes");
  const [products, setProducts] = useState([]);
  const [productsAll, setProductsAll] = useState([]);
  // ----------- Input Filter -----------
  const [queryAll, setQueryAll] = useState("");
  const [query, setQuery] = useState("");

  const handleInputChangeAll = async (event) => {
    console.log(event.target.value);
    const queryAll = event.target.value;
    searchAll(setProductsAll, queryAll);
    setQueryAll(queryAll);
  };

  //Get All Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const book = await getAllClothes(`8000/bookinfor/book`);
        const clothes = await getAllClothes(`8001/clothesinfor/clothes`);
        const mobile = await getAllClothes(`8002/mobileinfor/mobiles`);
        const productAll = [...clothes, ...mobile, ...book];

        // setProducts(productAll)
        // console.log("productAll for searchÂll",productAll)
        setProductsAll(productAll);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //Gọi All  cho lần đầu tiên
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const newDataProducts = await getAllClothes(
  //         `${selectedProduct.toLowerCase()}infor/${selectedProduct.toLowerCase()}`
  //       );
  //       if (newDataProducts?.length > 0) {
  //         setProducts(newDataProducts);
  //       }
  //       else{
  //         setProducts([])
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // ----------- Radio Filtering -----------
  const handleChange = (value) => {
    setSelectedCategory(value);
    filteredData(products, value, selectedProduct, setProducts);
  };
  // ------------ Button Filtering Type -----------
  const handleClick = (value) => {
    setSelectedProduct(value);
    navigate(`/${value}`);
  };

  // const filteredProducts =  filteredData(products, selectedCategory, query);

  const result = productsAll?.map(({ image, name, price, discount }) => (
    <Card
      key={Math.random()}
      image={image}
      name={name}
      price={price}
      discount={discount}
    />
  ));
  if (result?.length > 0)
    return (
      <Layout className="layout-default">
        <Sider width="14%" style={{ background: "white" }}>
          <ErrorBoundary>
            <Sidebar handleChange={handleChange} type={selectedProduct} />
          </ErrorBoundary>
        </Sider>
        <Layout>
          <Header style={{ background: "white", height: "90px", padding: "0" }}>
            <ErrorBoundary>
              <Navigation
                queryAll={queryAll}
                handleInputChangeAll={handleInputChangeAll}
              />
            </ErrorBoundary>
          </Header>

          <Content>
            <ErrorBoundary>
              <Recommended handleClick={handleClick} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Outlet context={[result]} />
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    );
  else {
    return (
      <Layout className="layout-default">
        <Sider width="14%" style={{ background: "white" }}>
          <ErrorBoundary>
            <Sidebar handleChange={handleChange} type={selectedProduct} />
          </ErrorBoundary>
        </Sider>
        <Layout>
          <Header style={{ background: "white", height: "90px", padding: "0" }}>
            <ErrorBoundary>
              <Navigation
                queryAll={queryAll}
                handleInputChangeAll={handleInputChangeAll}
              />
            </ErrorBoundary>
          </Header>

          <Content>
            <ErrorBoundary>
              <Recommended handleClick={handleClick} />
            </ErrorBoundary>
            <ErrorBoundary>
              <Outlet context={[[]]} />
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default LayoutDefault;
