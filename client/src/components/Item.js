import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const Item = ({ item }) => {
  const dispatch = useDispatch();

  function addToCart() {
    dispatch({
      type: "addToCart",
      payload: { ...item, quantity: 1 },
    });
  }

  return (
    <div className="item">
      <h4 className="name">{item.name}</h4>
      <img src={item.image} alt="" height="100" width="100" />
      <h4 className="price">
        <b>Price : </b>
        {item.price} $/-
      </h4>
      <div className="d-flex justify-content-end">
        <Button onClick={() => addToCart()}>Add To Cart</Button>
      </div>
    </div>
  );
};

export default Item;
