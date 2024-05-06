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

   
async function filteredData(products, selectedCategory, query,selectedProduct,setSelectedCategory) {
  console.log("on function filteredData");
  let filteredProducts = products;
  console.log("product",products)
  const fetchSearch = async () => {
    console.log("this is in search");
    const res = await getAllClothes(
      `${selectedProduct.toLowerCase()}search/${selectedProduct.toLowerCase()}/search?name=${query}`
    );
    console.log("response query search: " + res);
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
    let res = [];
    if (selectedCategory?.name === "All") {
        try {
            // Assuming getAllClothes returns a Promise
            res = await getAllClothes(`${selectedProduct.toLowerCase()}infor/${selectedProduct.toLowerCase()}`);
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
    } else if (selectedCategory !== null) {
      res = await getAllClothes(
        `${selectedProduct?.toLowerCase()}search/${selectedProduct.toLowerCase()}/search?categoryId=${selectedCategory.id}`
      );
    
      console.log("response query clothes by category: " + res);

      let clothesFilter = [];
      console.log("this is in by category: ",filteredProducts)
      filteredProducts.forEach((item) => {
        res.forEach((clothes) => {
          if (clothes.id === item.id) {
            clothesFilter.push(clothes);
          }
        });
      });
      filteredProducts = clothesFilter;
      // setSelectedCategory(selectedCategory);
    }
  };
  filteredProducts = fetchClothesByCategoryId();
  // return filteredProducts;
}

function LayoutDefault() {
  const navigate = useNavigate();
  // const { showBoundaryOfEffect } = useErrorBoundary();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("clothes");
  const [currentLayout, setCurrentLayout] = useState('default');
  const [products, setProducts] = useState([]);
  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = async (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newDataProducts = await getAllClothes(
          `${selectedProduct.toLowerCase()}infor/${selectedProduct.toLowerCase()}`
        );
        if (newDataProducts?.length > 0) {
          setProducts(newDataProducts);
        }
        else{
          setProducts([])
        }
      } catch (error) {
        // showBoundaryOfEffect(error)
        console.log(error);
      }
    };
    fetchData();
  }, [selectedProduct]);


  // ----------- Radio Filtering -----------
  const handleChange = (value) => {
    filteredData(products, value,query,selectedProduct,setSelectedCategory);
  };
  // ------------ Button Filtering Type -----------
  const handleClick = (value) => {
    setSelectedProduct(value);
    navigate(`/${value}`);
  };

  
 
  
  // const filteredProducts =  filteredData(products, selectedCategory, query);
 
  const result = products?.map(({ image, name, price, discount }) => (
    <Card
      key={Math.random()}
      image={image}
      name={name}
      price={price}
      discount={discount}
    />
  ));
  if(result?.length > 0)
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
  else{
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
              <Navigation query={query} handleInputChange={handleInputChange} />
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
