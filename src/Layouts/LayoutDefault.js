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
import { search, searchAll } from "../utils/Search/search";
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

  //search All Products
  const handleInputChangeAll = async (event) => {
    console.log(event.target.value);
    const queryAll = event.target.value;
    searchAll(setProductsAll, queryAll);
    setQueryAll(queryAll);
  };

  //search  Products
  const handleInputChange = (event) => {
    console.log(event.target.value);
    const query = event.target.value;
    search(products, setProducts, query, selectedProduct);
    setQuery(query);
  };
  //Get All Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const book = await getAllClothes(`8000/bookinfor/book`);
        const clothes = await getAllClothes(`8001/clothesinfor/clothes`);
        const mobile = await getAllClothes(`8002/mobileinfor/mobile`);
        const productAll = [...clothes, ...mobile, ...book];
        console.log("productsAllFirst",productAll);
        setProductsAll(productAll);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Gọi All  cho lần đầu tiên
  useEffect(() => {
    const fetchData = async () => {
      let port = 8000;
      if (selectedProduct === "clothes") {
        port = 8001;
      } else if (selectedProduct === "mobile") {
        port = 8002;
      }
      try {
        const newDataProducts = await getAllClothes(
          `${port}/${selectedProduct.toLowerCase()}infor/${selectedProduct.toLowerCase()}`
        );
        if (newDataProducts?.length > 0) {
          setProducts(newDataProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedProduct]);

  // ----------- Radio Filtering ----------- o Category
  const handleChange = (value) => {
    setSelectedCategory(value);
  };

  // ------------ Button Filtering Type -----------
  const handleClick = (value) => {
    setSelectedProduct(value);
    navigate(`/${value}`);
  };

  // const filteredProducts =  filteredData(products, selectedCategory, query);
  let result = [];

  console.log("productAll",productsAll)

  if (selectedProduct === "all-products") {
    result = productsAll?.map(({ image, name, price, discount }) => (
      <Card
        key={Math.random()}
        image={image}
        name={name}
        price={price}
        discount={discount}
      />
    ));
  } else {
    result = products?.map(({ image, name, price, discount }) => (
      <Card
        key={Math.random()}
        image={image}
        name={name}
        price={price}
        discount={discount}
      />
    ));
  }
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
          <Outlet context={[result, { handleInputChange, query }]} />
        </ErrorBoundary>
      </Content>
    </Layout>
  </Layout>
  )
}
export default LayoutDefault;
