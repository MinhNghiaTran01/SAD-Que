/* eslint-disable no-unused-vars */
import { Layout, Flex, Button, Image, Table } from "antd";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Card from "../components/Card";
import Navigation from "../Navigation/Nav";
import { useEffect, useState } from "react";
import products from "../db/data";
import Recommended from "../Recommended/Recommended";
import Products from "../Products/Products";
import "./index.css";
import { getAllProduct } from "../services/productService";
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
  // const { showBoundaryOfEffect } = useErrorBoundary();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("book");
  const [products, setProducts] = useState([])
  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect( () => {
    const fetchData = async () => {
      try{
        const newDataProducts = await getAllProduct(`${selectedProduct}/getAll`)
        console.log(newDataProducts)
        if(newDataProducts){
          setProducts(newDataProducts)
        }
      }
      catch(error){
        // showBoundaryOfEffect(error)
        console.log(error)
      }
    }
    fetchData()
  },[selectedProduct])

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering Type -----------
  const handleClick = (event) => {
    setSelectedType(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, price, title }) =>
          category === selected ||
          color === selected ||
          price === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ image_url, title, price }) => (
        <Card
          key={Math.random()}
          image_url={image_url}
          title={title}
          price={price}
        />
      )
    );
  }
  const result = filteredData(products, selectedCategory, query);
  return (
    <Layout className="layout-default">
      <Sider width="14%" style={{ background: "white" }}>
        <ErrorBoundary>
          <Sidebar handleChange={handleChange} type={selectedType}/>
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
            <Products result={result} />
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
}
export default LayoutDefault;
