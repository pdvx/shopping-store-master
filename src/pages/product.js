import { Col, Skeleton, Row, Button, Rate } from "antd";
import { StarOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:8765/products/${id}`);
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
                <p>Rate it now <Rate allowHalf /></p>
                <Button>Add to cart</Button>
                <Button>Go to cart</Button>
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
