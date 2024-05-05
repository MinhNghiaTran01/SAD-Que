import { BsFillBagFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
const Card = ({ image_url, title, price }) => {
  return (
    <>
      <section className="card">
        <img src={image_url} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
          <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar />
          </section>
          <section className="card-price">
            <div className="price">
              <del>200$</del> {price}$
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
