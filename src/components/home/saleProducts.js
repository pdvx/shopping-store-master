import { Col, Row, Button } from "antd";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function SaleProducts() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  // const [loading, setLoading] = useState(false);
  // let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      // setLoading(true);
      // const response = await fetch(
      //   "https://fakestoreapi.com/products/category/women's clothing?limit=3"
      // );
      // if (componentMounted) {
      //   setData(await response.clone().json());
      //   setFilter(await response.json());
      //   setLoading(false);
      // }
      await fetch("http://localhost:8765/products/category/women's clothing?limit=3").then((response) => response.json())
      .then((response) => {
        // setLoading(false);
        setData(response)
        setFilter(response);
      });

      // return () => {
      //   componentMounted = false;
      // };
    };
    getProducts();
  }, []);

  const ShowProducts = () => {
    return (
      <div className="block products shopPage">
        <div className="container">
          <div className="title">
            <h2>Most saled products</h2>
          </div>
          <Row gutter={[24, 24]}>
            {filter?.map((product) => {
              return (
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  lg={{ span: 6 }}
                  key={product.key}
                >
                  <div className="content">
                    <div className="image">
                      <img src={product.image} alt="product" />
                    </div>
                    <h3>{product.title}</h3>
                    <div className="price">
                      <span className="salePrice">{product.saleprice}</span>$
                      {product.price}
                    </div>
                    <NavLink
                      to={`/demo/react/antdesign/grocery/shop/${product.id}`}
                    >
                      <Button type="primary">Buy now</Button>
                    </NavLink>
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
    <div className="block products separator">
      {/* <h2>Sale Products</h2>
      <Row gutter={[24, 24]}>
        {products.map(product => {
          return (
            <Col xs={{ span: 24 }} sm={{ span: 12 }} lg={{ span: 6 }} key={product.key}>
              <div className="content">
                <div className="image">
                  <img src={product.image} alt="product" />
                </div>
                <h3>{product.title}</h3>
                <div className='price'>
                  <span className='salePrice'>{product.saleprice}</span> 
                  {product.price}
                </div>
                <Button type="primary">Add to Basket</Button>
              </div>
            </Col>
          );
        })}
      </Row> */}
      <ShowProducts />
    </div>
  );
}

export default SaleProducts;
