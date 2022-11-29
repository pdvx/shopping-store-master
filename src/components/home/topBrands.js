import { Col, Row } from 'antd';

const products = [
  {
    key: '1',
    image: require('../../assets/images/vans.png'),
  },
  {
    key: '2',
    image: require('../../assets/images/converse.jpg'),
  },
  {
    key: '3',
    image: require('../../assets/images/360boutique.png'),
  },
  {
    key: '4',
    image: require('../../assets/images/adidas.jpg'),
  },
];

function TopBrands() {
  return (
    <div className="block products shopPage">
      <div className="title">
        <h2>Top Brands</h2>
      </div>
      <Row gutter={[24, 24]}>
        {products.map((product) => {
          return (
            <Col xs={{ span: 12 }} sm={{ span: 6 }} key={product.key}>
              <div className="content">
                <div className="image">
                  <img src={product.image} alt="product" />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default TopBrands;
