import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product, onAddToCart }) => {
  const isInStock = product.rating?.count !== 0;

  const isClothing =
    product.category === "men's clothing" ||
    product.category === "women's clothing";

  const isElectronics = product.category === "electronics";
  const isJewelry = product.category === "jewelery";

  const colorOptions = [
    { value: "", label: "Choose color" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "gray", label: "Gray" },
    { value: "black", label: "Black" },
  ];

  const materialOptions = [
    { value: "", label: "Choose material" },
    { value: "gold", label: "Gold" },
    { value: "silver", label: "Silver" },
    { value: "platinum", label: "Platinum" },
    { value: "diamond", label: "Diamond" },
  ];

  const renderDropdown = () => {
    if (isClothing) {
      return (
        <select className="form-select form-select-sm">
          {colorOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (isJewelry) {
      return (
        <select className="form-select form-select-sm">
          {materialOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return null;
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card text-center h-100 w-100 d-flex flex-column">
        <img
          className="card-img-top p-3"
          src={product.image}
          alt={product.title}
          height={250}
          style={{ objectFit: "contain" }}
        />

        <div className="card-body">
          <h5 className="card-title">
            {product.title.length > 12
              ? product.title.substring(0, 12) + "..."
              : product.title}
          </h5>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item lead">$ {product.price}</li>

          {(isClothing || isElectronics || isJewelry) && (
            <li className="list-group-item">{renderDropdown()}</li>
          )}
        </ul>

        <div className="card-body mt-auto">
          <Link
            to={`/product/${product.id}`}
            className={`btn m-1 ${isInStock ? "btn-dark" : "btn-outline-secondary disabled"
              }`}
            aria-disabled={!isInStock}
            tabIndex={isInStock ? 0 : -1}
          >
            Buy Now
          </Link>

          {isInStock ? (
            <button
              className="btn btn-dark m-1"
              onClick={() => {
                toast.success("Added to cart");
                onAddToCart(product);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button className="btn btn-outline-danger m-1" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
