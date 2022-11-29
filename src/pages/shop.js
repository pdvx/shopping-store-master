import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Skeleton, Dropdown, Menu, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { orderBy } from 'lodash';
const { Search } = Input;
const menuSort = [
  {
    key: '1',
    label: 'Featured',
  },
  {
    key: '2',
    label: 'Price: Low to High',
    field: 'price',
    direction: 'asc',
  },
  {
    key: '3',
    label: 'Price: High to Low',
    field: 'price',
    direction: 'desc',
  },
  {
    key: '4',
    label: 'Rating: Low to High',
    field: 'rating',
    direction: 'asc',
  },
  {
    key: '5',
    label: 'Rating: High to Low',
    field: 'rating',
    direction: 'desc',
  },
];
const getFieldAndSortDirection = (key) => {
  return menuSort.find((item) => +item.key === +key);
};
function AppShop() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    await fetch('http://localhost:8765/products')
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setData(response.products);
        setFilter(response.products);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const Loading = () => {
    return <Skeleton />;
  };

  const filterProduct = (cat) => {
    const updatedList = data?.filter((x) => x?.category === cat);
    setFilter(updatedList);
  };

  const onChangeSort = (direction) => {
    const sort = getFieldAndSortDirection(direction.key);
    if (sort) {
      setSortBy(sort);
      const updatedList = orderBy(data, [sort.field], [sort.direction]);
      setFilter(updatedList);
    } else {
      setFilter(data);
    }
  };

  const onSearch = (keyword) => {
    const updatedList = data?.filter((x) => x?.title.includes(keyword));
    setFilter(updatedList);
  };

  const sortMenu = <Menu items={menuSort} onClick={onChangeSort} />;

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
              onClick={() => filterProduct('jewelery')}
            >
              Jewelery
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => filterProduct('electronics')}
            >
              Electronic
            </button>
          </div>
          <div className="titleHolder">
            <h2>Shop</h2>
            <div
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row-reverse',
              }}
            >
              <Search
                placeholder="Tìm sản phẩm"
                allowClear
                enterButton="Search"
                size="medium"
                onSearch={onSearch}
                style={{
                  width: '30%',
                  paddingTop: '5px',
                }}
              />
              <Dropdown
                overlay={sortMenu}
                placement="bottomLeft"
                trigger={['click']}
              >
                <Button style={{ marginRight: '-1px' }}>
                  {sortBy ? sortBy?.label : 'Sort by'}
                </Button>
              </Dropdown>
            </div>
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
                      <img src={product?.image} alt="product" />
                    </div>
                    <h3>{product?.title}</h3>
                    <div className="price">${product?.price}</div>
                    <NavLink
                      to={`/demo/react/antdesign/grocery/shop/${product?.id}`}
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
