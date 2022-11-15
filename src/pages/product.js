import { Col, Skeleton, Row, Button, Rate, InputNumber } from "antd";
import { StarOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";

const Product = () => {
  const urlApi = "http://localhost:8765";
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`${urlApi}/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);

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
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const addToCart = async () => {
    const isLogin = sessionStorage.getItem("userToken")
    if (!isLogin) {
      return navigate('/demo/react/antdesign/grocery/signin');
    }
    const userId = sessionStorage.getItem("userId")
    const data = {
      userId: userId,
      products: [
        {
          productId: product.id,
          quantity: quantity,
        },
      ],
    };
    const response = await postData(`${urlApi}/carts`, data);
    if (response.status === "success") {
      alert("Success");
    } else {
      alert("Error");
    }
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={10}>
              <div>
                <img
                  src={product.image}
                  alt={product.title}
                  height="400px"
                  width="400px"
                />
              </div>
            </Col>
            <Col xs={24} lg={14}>
              <div className="productDetails">
                <h1 className="productCat">{product.category}</h1>
                <h1 className="productTitle">{product.title}</h1>
                <p>
                  Overall rating {product.rating && product.rating.rate}
                  <StarOutlined />
                </p>
                <h3 className="productPrice">${product.price}</h3>
                <p>{product.description}</p>
                <p>
                  Rate it now <Rate allowHalf />
                </p>

                <p>
                  {"Số lượng: "}
                  <InputNumber
                    defaultValue="1"
                    min={1}
                    max={99}
                    value={quantity}
                    onChange={setQuantity}
                  />
                </p>
                <Button onClick={addToCart}>Add to cart</Button>
                <NavLink to={`/demo/react/antdesign/grocery/cart`}>
                  <Button>Go to cart</Button>
                </NavLink>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return (
    <div>
      <div>{loading ? <Loading /> : <ShowProduct />}</div>
    </div>
  );
};

export default Product;
