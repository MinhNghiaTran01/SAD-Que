import { useState } from "react";
import "./Recommended.css";
import { Radio } from "antd";
const Recommended = ({ handleClick }) => {
  const [selectedProduct, setSelectProduct] = useState("All Products");

  const handleSizeChange = (e) => {
    setSelectProduct(e.target.value)
  }
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Radio.Group value={selectedProduct} onChange={handleSizeChange}>
            <Radio.Button onClick={(e) => {handleClick(e.target.value) }} value="all-products">All Products</Radio.Button>
            <Radio.Button onClick={(e) => {handleClick(e.target.value) }} value="book">Book</Radio.Button>
            <Radio.Button onClick={(e) => {handleClick(e.target.value) }} value="clothes">Clothes</Radio.Button>
            <Radio.Button onClick={(e) => {handleClick(e.target.value) }} value="mobile">Mobile</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </>
  );
};

export default Recommended;
