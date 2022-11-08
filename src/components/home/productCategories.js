import { Col, Row } from 'antd';

const productCategories = [
  {
    key: '1',
    image: require('../../assets/images/img15.jpg'),
    title: 'Frozen'
  },
  {
    key: '2',
    image: require('../../assets/images/img16.jpg'),
    title: 'Fresh'
  },
  {
    key: '3',
    image: require('../../assets/images/img19.jpg'),
    title: 'Drinks'
  },
  {
    key: '4',
    image: require('../../assets/images/img20.jpg'),
    title: 'Bakery'
  },
  // {
  //   key: '5',
  //   image: require('../../assets/images/img21.jpg'),
  //   title: 'Fresh Fruits'
  // },
  // {
  //   key: '6',
  //   image: require('../../assets/images/img22.jpg'),
  //   title: 'Hot Buys'
  // },
  // {
  //   key: '7',
  //   image: require('../../assets/images/img23.jpg'),
  //   title: 'Offers'
  // },
  // {
  //   key: '8',
  //   image: require('../../assets/images/img25.jpg'),
  //   title: 'Beers & Wines'
  // }
]

function ProductCategories() {
  return (
    <div className="block productCategories">
      <h2>Product Categories</h2>
      <Row gutter={[24, 24]}>
        {productCategories.map(productCategory => {
          return (
            <Col xs={{ span: 12 }} sm={{ span: 6 }} lg={{ span: 4 }} key={productCategory.key}>
              <div className="content">
                <div className="image">
                  <img src={productCategory.image} alt="product" />
                </div>
                <h3>{productCategory.title}</h3>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ProductCategories;