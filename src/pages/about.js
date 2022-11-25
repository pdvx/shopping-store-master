import { Tabs } from 'antd';

import aboutBanner1 from '../assets/images/aboutBanner1.jpg';

const { TabPane } = Tabs;

function AppAbout() {
  return (
    <div className="block aboutPage">
      <div className="container">
        <h2>About us</h2>
        <div className="bannerImage">
          <img src={aboutBanner1} alt="banner" />
        </div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="About" key="1">
            <p>Welcome to Thomas's Shopping Store</p>
            <p>
              We aim to offer our customers a variety of the latest products.
              We've come a long way, so we know exactly which direction to take
              when supplying you with high quality yet budget-friendly products.
              We offer all of this while providing excellent customer service
              and friendly support.
            </p>

            <p>
              We always keep an eye on the latest trends in food industry and
              put our customers' wishes first. That is why we have satisfied
              customers all over the world, and are thrilled to be a part of the
              food industry.
            </p>

            <p>
              The interests of our customers are always top priority for us, so
              we hope you will enjoy our products as much as we enjoy making
              them available to you.
            </p>
          </TabPane>
          <TabPane tab="Investors" key="2">
            <p>
              We are so proud to announce that one of the most important
              shareholder is Elon Musk.
            </p>

            <p>
              Being the richest man in the world, also a talented bussiness
              magnate and investor. He decided to invest in our company after
              investigate and accompanied with us through half of decade.
            </p>

            <p>
              After 5 years of cooperation with him, we have made a record of
              net income about 4 to 5 millions dollars. Though it is a good
              report but we are expected that our system and product will be
              world wide known in order to contribute a little effort to make
              world economic stable after the COVID-19 pandemic.
            </p>
          </TabPane>
          <TabPane tab="Product" key="3">
            <p>With a slogan of "Never satisfy with being the best".</p>

            <p>
              We make a commitment to provide our customers with the best
              quality product with the affordable for all range of customers. We
              appreciate your health, concern more than anything.
            </p>

            <p>
              Our services will try to process, take in all of your ideas,
              comment to make our system more and more perfect. Please continute
              to have a trust in us because we will always be there for you
              whenever you need.
            </p>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default AppAbout;
