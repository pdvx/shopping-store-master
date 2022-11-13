import React, { useState, useEffect } from "react";
import { Col, Row, Button, Skeleton } from "antd";
import { NavLink } from "react-router-dom";

function AppShop() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      await fetch("http://localhost:8765/products").then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setData(response.products)
        setFilter(response.products);
      });
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <Skeleton />
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data?.filter((x) => x?.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <div className="block products shopPage">
        <div className="container">
          <div className="buttons">
            <button
              className="btn btn-outline-dark"
              onClick={() => setFilter(data)}
            >
              All
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => filterProduct("men's clothing")}
            >
              Men's Clothing
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => filterProduct("women's clothing")}
            >
              Women's Clothing
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => filterProduct("jewelery")}
            >
              Jewelery
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => filterProduct("electronics")}
            >
              Electronic
            </button>
          </div>
          <Row gutter={[24, 24]}>
            {filter?.map((product) => {
              return (
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  lg={{ span: 6 }}
                  key={product?.id}
                >
                  <div className="content">
                    <div className="image">
                      <img src={product?.image} alt="product"/>
                    </div>
                    <h3>{product?.title}</h3>
                    <div className="price">${product?.price}</div>
                    <NavLink to={`/demo/react/antdesign/grocery/shop/${product?.id}`}><Button type="primary">Buy now</Button></NavLink>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="titleHolder">
        <h2>All products</h2>
        <hr />
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
}

export default AppShop;
