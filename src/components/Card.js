import { BsFillBagFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

function formatNumber(num) {
  return num.toLocaleString('de-DE'); // For US locale, this uses comma as thousand separator
}
const Card = ({ image, name, price,discount }) => {
  price = parseFloat(price.toString());
  return (
    <>
      <section className="card">
        <img src={image} alt={name} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{name}</h3>
          <section className="card-reviews">
          <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />
          </section>
          <section className="card-price">
            <div className="price">
              <ins style={{"fontWeight": 600,"fontSize" : 16, "color": "#3E3E3F", "textDecoration": "none", }}>{formatNumber(price*discount/100)}đ     </ins>
              <del style={{"color" : "#A8A9AD", "fontSize" : 12, "fontWeight": 400, }}><span>{formatNumber(price)}đ</span></del> 
            </div>
            <div className="bag">
              <BsFillBagFill className="bag-icon" />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
