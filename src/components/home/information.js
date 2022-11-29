import { Col, Row, Carousel } from 'antd';

import bgImage1 from '../../assets/images/black-friday-sale.jpg';
import bgImage2 from '../../assets/images/christmas-sale.jpg';
import bgImage3 from '../../assets/images/autumn-sale.jpg';

function Information() {
  return (
    <div className="block informationBlock shopPage">
      <div className="title">
        <h2>Upcoming sales campaign</h2>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Carousel autoplay>
            <div>
              <img src={bgImage1} alt="banner 1" />
            </div>
            <div>
              <img src={bgImage2} alt="banner 2" />
            </div>
            <div>
              <img src={bgImage3} alt="banner 3" />
            </div>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}

export default Information;
