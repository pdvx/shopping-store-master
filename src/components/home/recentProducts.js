import { Col, Row, Button, Skeleton } from 'antd';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function RecentProducts() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  // let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      // let response;
      await fetch('http://localhost:8765/products?limit=4')
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          setData(response.products);
          setFilter(response.products);
        });
      // if (componentMounted) {
      //   setData(await response.clone().json());
      //   setFilter(await response.json());
      //   setLoading(false);
      // }
      // return () => {
      //   componentMounted = false;
      // };
    };
    getProducts();
  }, []);

  const Loading = () => {
    return <Skeleton />;
  };

  const ShowProducts = () => {
    return (
      <div className="block products shopPage">
        <div className="container">
          <div className="title">
            <h2>Lastest products</h2>
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
                    <div className="price">${product.price}</div>
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
  return <div>{loading ? <Loading /> : <ShowProducts />}</div>;
}

export default RecentProducts;
