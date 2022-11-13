import { Col, Skeleton, Row, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import { Typography } from "antd";
const { Title } = Typography;

const Cart = () => {
  const urlApi = "http://localhost:8765";
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCarts = async () => {
      setLoading(true);
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        await fetch(`${urlApi}/carts/user/${userId}`)
          .then((response) => response.json())
          .then((response) => {
            let products = [];
            response.forEach((e) => {
              products = [].concat(products, e.products);
            });
            setCarts(products);
          });
      }
      setLoading(false);
    };
    getCarts();
  }, []);

  const Loading = () => {
    return (
      <>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <div>
              <Skeleton height={400} />
            </div>
          </Col>
          <Col xs={24} lg={14}>
            <div style={{ lineHeight: 2 }}>
              <Skeleton height={50} width={300} />
              <Skeleton height={75} />
              <Skeleton height={25} width={150} />
              <Skeleton height={50} />
              <Skeleton height={150} />
              <Skeleton height={50} width={100} />
              <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const ShowCart = () => {
    return (
      <>
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24} style={{ marginTop: 10 }}>
              <Title level={4}>Total Items: {carts.length}</Title>
            </Col>
            {carts.map((cart) => {
              return (
                <Col xs={12} lg={12} md={24}>
                  <div style={{ display: "flex" }}>
                    <img
                      src={cart?.image}
                      alt={cart?.title}
                      height="100px"
                      width="100px"
                    />
                    <div style={{ margin: "20px" }}>
                      <h3 className="">{cart.title}</h3>
                      <p>
                        {"Số lượng: "}
                        <InputNumber
                          value={cart.quantity}
                          disabled
                        />
                      </p>
                      <h3 className="productCost">Price: {cart.price} $</h3>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </>
    );
  };

  return (
    <div>
      <div>{loading ? <Loading /> : <ShowCart />}</div>
    </div>
  );
};

export default Cart;
