import { Col, Skeleton, Row, InputNumber, Button } from "antd";
import React, { useState, useEffect } from "react";
import { Typography } from "antd";
const { Title } = Typography;

const Cart = () => {
  const urlApi = "http://localhost:8765";
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const ORDER_STATUS_CONST = {
    PREPARING: 0,
    IN_PROGRESS: 1,
    DONE: 2,
  };

  const CONFIG_ORDER_STATUS = {
    [ORDER_STATUS_CONST.PREPARING]: {
      message: "Đang chuẩn bị",
      color: "primary",
    },
    [ORDER_STATUS_CONST.IN_PROGRESS]: {
      message: "Đang trong kho",
      color: "#5cdbd3",
    },
    [ORDER_STATUS_CONST.DONE]: { message: "Đã gửi", color: "#95de64" },
  };

  useEffect(() => {
    const getCarts = async () => {
      setLoading(true);
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        await fetch(`${urlApi}/carts/user/${userId}`)
          .then((response) => response.json())
          .then((response) => {
            setCarts(response);
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
              const status = CONFIG_ORDER_STATUS[cart?.status || ORDER_STATUS_CONST.PREPARING]
              return (
                <Col xs={24} style={{ border: "1px solid #ccc" }}>
                  <Button type="primary" style={{ background: status.color, borderColor: status.color, marginTop: '10px', float: 'right' }}>{status.message}</Button>
                  {cart.products.map((product, index) => {
                    return (
                      <Col xs={24}>
                        <div
                          style={{
                            display: "flex",
                            padding: "20px 0",
                            paddingTop: index === 0 ? "0px" : "20px",
                            width: "100%",
                            borderBottom:
                              index === cart.products.length - 1
                                ? "none"
                                : "1px solid #ccc",
                          }}
                        >
                          <img
                            src={product?.product?.image}
                            alt={product?.product?.title}
                            height="100px"
                            width="100px"
                          />
                          <div style={{ margin: "20px" }}>
                            <h3 className="">{product.product.title}</h3>
                            <p>
                              {"Quantity: "}
                              <InputNumber value={product.quantity} disabled />
                            </p>
                            <h3 className="productCost">
                              Price: {product.product.price * product.quantity}{" "}
                              $
                            </h3>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
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
