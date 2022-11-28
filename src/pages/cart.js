import { Col, Skeleton, Row, InputNumber, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const Cart = () => {
  const urlApi = 'http://localhost:8765';
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [productCart, setProductCart] = useState({});
  const [loading, setLoading] = useState(false);
  const ORDER_STATUS_CONST = {
    PREPARING: 0,
    IN_PROGRESS: 1,
    DONE: 2,
    AWAITING: 3,
  };

  const CONFIG_ORDER_STATUS = {
    [ORDER_STATUS_CONST.PREPARING]: {
      message: 'Đang chuẩn bị',
      color: 'primary',
    },
    [ORDER_STATUS_CONST.IN_PROGRESS]: {
      message: 'Đang trong kho',
      color: '#5cdbd3',
    },
    [ORDER_STATUS_CONST.DONE]: { message: 'Đã gửi', color: '#95de64' },
    [ORDER_STATUS_CONST.AWAITING]: { message: 'Checkout', color: '#95de64' },
  };

  const getCarts = async () => {
    setLoading(true);
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      await fetch(`${urlApi}/carts/user/${userId}`)
        .then((response) => response.json())
        .then((response) => {
          setCarts(response);
          console.log('-> response', response);
          const productCart = {};
          response.forEach((cart) => {
            if (cart.status === ORDER_STATUS_CONST.AWAITING) {
              productCart[cart.id] = cart.products;
            }
          });
          setProductCart(productCart);
        });
    }
    setLoading(false);
  };

  useEffect(() => {
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
  const handleChangeQuantity = async (cartId, productId, quantity) => {
    const newProductCart = { ...productCart };
    const indexProduct = newProductCart[cartId].findIndex(
      (product) => product._id === productId
    );
    newProductCart[cartId][indexProduct].quantity = quantity;
    setProductCart(newProductCart);
  };

  const handleClickCheckout = async (cartId, notCheckouted = true) => {
    console.log({ cartId });
    return navigate(
      `/demo/react/antdesign/checkout?id=${cartId}&success=${
        notCheckouted ? 0 : 1
      }`
    );
    const products = productCart[cartId];
    const requestUpdateCart = {
      status: ORDER_STATUS_CONST.PREPARING,
      userId: sessionStorage.getItem('userId'),
      products: products
        .filter((product) => product.quantity > 0)
        .map((product) => ({
          productId: product.product.id,
          quantity: product.quantity,
        })),
    };
    await fetch(`${urlApi}/carts/${cartId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestUpdateCart),
    })
      .then((response) => response.json())
      .then((response) => {
        setCarts(response);
        getCarts();
      });
  };

  const ShowCart = () => {
    return (
      <>
        <div className="container" style={{ marginBottom: '20px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} style={{ marginTop: 10 }}>
              <Title level={4}>Total Items: {carts.length}</Title>
            </Col>
            {carts.map((cart, indexCart) => {
              const status =
                CONFIG_ORDER_STATUS[
                  cart?.status || ORDER_STATUS_CONST.PREPARING
                ];
              return (
                <Col
                  xs={24}
                  style={{ border: '1px solid #ccc' }}
                  key={indexCart}
                  marginBottom="20px"
                >
                  {+cart?.status !== +ORDER_STATUS_CONST.AWAITING && (
                    <div>
                      <Button
                        type="primary"
                        style={{
                          background: status.color,
                          borderColor: status.color,
                          marginTop: '10px',
                          float: 'right',
                        }}
                      >
                        {status.message}
                      </Button>
                      <Button
                        onClick={() => handleClickCheckout(cart?.id, false)}
                      >
                        View
                      </Button>
                    </div>
                  )}
                  {cart.products.map((product, indexProduct) => {
                    return (
                      <Col xs={24}>
                        <div
                          style={{
                            display: 'flex',
                            padding: '20px 0',
                            paddingTop: indexProduct === 0 ? '0px' : '20px',
                            width: '100%',
                            borderBottom:
                              indexProduct === cart.products.length - 1
                                ? 'none'
                                : '1px solid #ccc',
                          }}
                        >
                          <img
                            src={product?.product?.image}
                            alt={product?.product?.title}
                            height="100px"
                            width="100px"
                          />
                          <div style={{ margin: '20px' }}>
                            <h3 className="">{product.product.title}</h3>
                            <p>
                              {'Quantity: '}
                              <InputNumber
                                value={product.quantity}
                                min={0}
                                max={99}
                                onChange={(value) =>
                                  handleChangeQuantity(
                                    cart.id,
                                    product._id,
                                    value
                                  )
                                }
                                disabled={
                                  +cart?.status !== +ORDER_STATUS_CONST.AWAITING
                                }
                              />
                            </p>
                            <h3 className="productCost">
                              Price: {product.product.price * product.quantity}{' '}
                              $
                            </h3>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                  {+cart?.status === +ORDER_STATUS_CONST.AWAITING && (
                    <Button
                      type="primary"
                      style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        float: 'right',
                      }}
                      onClick={() => handleClickCheckout(cart?.id)}
                    >
                      Checkout
                    </Button>
                  )}
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
