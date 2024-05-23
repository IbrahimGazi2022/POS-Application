import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../resourses/item.css";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const getAllItems = () => {
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        setItemsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>
      <Row gutter={15}>
        {itemsData.map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
