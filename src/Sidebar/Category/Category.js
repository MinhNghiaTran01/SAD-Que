import "./Category.css";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { getAllCategory } from "../../services/categoryService";
// import {categoryBook} from '../../db'
function Category({ handleChange, type = "clothes" }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategory(`${type}create/categories`);
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [type]);

  return (
    <div className="sidebar-category">
      <h2 className="sidebar-title">Category</h2>
      <div>
        <label className="sidebar-label-container">
          <input onChange={() => handleChange("All")} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        {categories?.map((item, i) => (
          <label className="sidebar-label-container" key={i}>
            <input onChange={() => handleChange({
              "name" : item.name,
              "id": item.id,
            })} type="radio" value={item.name} name="test" />
            <span className="checkmark"></span>{item.name}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Category;
