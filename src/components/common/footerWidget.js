import { Col, Row } from 'antd';
import { List, Tag } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const catagories = [
  "Men's Clothing",
  "Women's Clothing",
  'Jewelry',
  'Electronics',
];

const data = [
  'The most popular trends to expect in 2022.',
  'What is the biggest change in economical industry?',
  'How to improve and maintain the industry?',
  'What was happened to the economy in the pandemic?',
  'Solutions for marketing and increase sales.',
];

function FooterWidget() {
  return (
    <div className="footerWidget">
      <div className="container">
        <Row gutter={[24, 24]}>
          {/* featured */}
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={6}>
            <h3>Our Shopping store</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              rhoncus dapibus sodales. Praesent ultricies a enim quis suscipit.
              Aenean malesuada orci sed augue ultrices, ac efficitur mauris
              dapibus. Curabitur ex neque, tempus semper dignissim in, viverra
              quis ante.
            </p>
            <h1>
              Read more <ArrowRightOutlined />
            </h1>
          </Col>
          {/* top rated */}
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={6}>
            <h3>Categories</h3>
            <List
              itemLayout="horizontal"
              dataSource={catagories}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>
          {/* tags */}
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={6}>
            <h3>Tags</h3>
            <div className="tags">
              <Tag>Fashion</Tag>
              <Tag>Trending</Tag>
              <Tag>Hard drive</Tag>
              <Tag>Men's wear</Tag>
            </div>
          </Col>
          {/* recent posts */}
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={6}>
            <h3>Recent posts</h3>
            <List
              size="small"
              className="recentPost"
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default FooterWidget;
