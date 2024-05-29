import React, { useEffect, useState } from "react";
import axios from "axios";
import "../resourses/item.css";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Button, Input, Modal, Table, Form, Select, message } from "antd";
import "../resourses/item.css";

const Items = () => {
  const { loading } = useSelector((state) => state.rootReducer);
  const [itemsData, setItemsData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();

  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemsData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined className="mx-2" />
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisibilty(true);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllItems();
  }, []);

  // Submit Form
  const onFinish = (values) => {
    if (editingItem === null) {
      dispatch({ type: "showLoading" });
      axios
        .post("/api/items/add-item", values)
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item added successfully");
          setAddEditModalVisibilty(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong");
          console.log(error);
        });
    } else {
      dispatch({ type: "showLoading" });
      axios
        .post("/api/items/edit-item", { ...values, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item edited successfully");
          setEditingItem(null);
          setAddEditModalVisibilty(false);
          getAllItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error("Something went wrong");
          console.log(error);
        });
    }
  };

  return (
    <DefaultLayout>
      {loading && (
        <div className="spinner">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden"> </span>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />
      {addEditModalVisibilty && (
        <Modal
          open={addEditModalVisibilty}
          title="Add New Item"
          onCancel={() => {
            setAddEditModalVisibilty(false);
            setEditingItem(null);
          }}
          title={`${editingItem !== null ? "Edit Item" : "Add New I"}`}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={editingItem}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>

            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>

            <Form.Item name="image" label="Image">
              <Input />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="fruits">Fruits</Select.Option>
                <Select.Option value="vegetables">Vagetables</Select.Option>
                <Select.Option value="meat">Meat</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Items;
