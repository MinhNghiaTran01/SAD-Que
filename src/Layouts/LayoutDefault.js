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
  const [selectedType, setSelectedType] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState([]);
  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = async (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newDataProducts = await getAllClothes(`${selectedProduct.toLowerCase()}infor/${selectedProduct.toLowerCase()}`);
        console.log(newDataProducts);
        if (newDataProducts?.length > 0) {
          setProducts(newDataProducts);
        }
      } catch (error) {
        // showBoundaryOfEffect(error)
        console.log(error);
      }
    };
    fetchData();
  }, [selectedProduct]);

  const filteredItems = products?.filter(
    (product) =>
      product?.name?.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (idCategory) => {
    setSelectedCategory(idCategory);
  };
  // ------------ Button Filtering Type -----------
  const handleClick = (value) => {
    setSelectedProduct(value);
    navigate(`/home/${value}`);
  };
  
  function filteredData(products, selectedCategory, query) {
    let filteredProducts = products;
    const fetchSearch = async () => {
      const res = await getAllClothes(
        `${selectedProduct.toLowerCase()}search/${selectedProduct.toLowerCase()}/search?name=${query}`
      );
      let clothesFilter = [];
      filteredProducts.forEach((item) => {
        res.forEach((clothes) => {
          if (clothes.id === item.id) {
            clothesFilter.push(clothes);
          }
        });
      });
      filteredProducts = clothesFilter;
    };

    if (query !== "") {
      fetchSearch();
    }

    const fetchClothesByCategoryId = async () => {
      let res = []
      if (selectedCategory === "All") {
        res = await getAllClothes(`${selectedProduct.toLowerCase()}infor/${selectedProduct.toLowerCase()}`);
        let clothesFilter = [];
        filteredProducts.forEach((item) => {
          res.forEach((clothes) => {
            if (clothes.id === item.id) {
              clothesFilter.push(clothes);
            }
          });
        });
        filteredProducts = clothesFilter;
        
      }
      else{
        res = await getAllClothes(`${selectedProduct.toLowerCase()}infor/${selectedProduct.toLowerCase()}?categoryId=${selectedCategory}`);
        let clothesFilter = [];
        filteredProducts.forEach((item) => {
          res.forEach((clothes) => {
            if (clothes.id === item.id) {
              clothesFilter.push(clothes);
            }
          });
        });
        filteredProducts = clothesFilter;
      }
      
    };
    fetchClothesByCategoryId();

    return filteredProducts.map(({ image, name, price, discount }) => (
      <Card
        key={Math.random()}
        image={image}
        name={name}
        price={price}
        discount={discount}
      />
    ));
  }
  const result = filteredData(products, selectedCategory, query);
  return (
    <Layout className="layout-default">
      <Sider width="14%" style={{ background: "white" }}>
        <ErrorBoundary>
          <Sidebar handleChange={handleChange} type={selectedType} />
        </ErrorBoundary>
      </Sider>
      <Layout>
        <Header style={{ background: "white", height: "90px", padding: "0" }}>
          <ErrorBoundary>
            <Navigation query={query} handleInputChange={handleInputChange} />
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
}
export default LayoutDefault;
