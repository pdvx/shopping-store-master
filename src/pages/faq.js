import { Collapse } from 'antd';
const { Panel } = Collapse;

const AppFAQ = () => {
  return (
    <div className="block faqPage">
      <div className="container">
        <h2>FAQ</h2>
        <Collapse accordion defaultActiveKey={['1']}>
          <Panel header="Ordering for customers outside VN" key="1">
            <p>
              Asia deliveries – All orders to EU addresses will be delivered
              with all duties and taxes paid by us.
            </p>
            <p>
              Non-Asia deliveries - Depending on the value of your order, your
              PrettyLittleThing parcel may or may not be charged customs or
              import duties. If your parcel is charged, it is up to the person
              receiving the parcel to cover these costs. Unfortunately, these
              charges are out of PrettyLittleThing's hands, and vary widely from
              country to country, so we're unable to predict what your
              particular charges may be. For more accurate information, we would
              suggest getting in touch with your local customs office so you're
              not surprised if there are any unexpected delivery charges at your
              end.
            </p>
          </Panel>
          <Panel header="What is your returns policy?" key="2">
            <ul>
              <li>Items must be returned within 2-3 days of receipt.</li>
              <li>
                We offer FREE RETURNS for VN customers however you must obtain
                proof of postage just in case your order is lost on its way
                back.
              </li>
              <li>
                If you are not a VN customer, all the expenses must be covered
                before sending the package back to us.
              </li>
            </ul>
          </Panel>
          <Panel header="How can I pay for my order" key="3">
            <p>We got you covered! We accept the following payment methods:</p>
            <ul>
              <li>Visa</li>
              <li>VN Pay</li>
              <li>Momo</li>
              <li>Credit Card</li>
              <li>Master Card</li>
              <li>Debit Card</li>
            </ul>
            <p>
              We use industry-standard encryption systems for potentially
              sensitive information, such as your name, address and other
              critically sensitive information like your credit / debit card
              details. Information passed between your computer and our website
              cannot be read in the event of someone else intercepting it.
            </p>
          </Panel>
          <Panel header="How do I change my contact preferences?" key="4">
            <p>
              You can choose how you want us to contact you about things we
              think you'd like to hear about. Don’t wanna keep up with our
              latest goings on, offers and all things TGS? No worries, simply
              log into your account, click on contact preferences and untick all
              contact options.
            </p>
          </Panel>
          <Panel header="Is it safe to order online?" key="5">
            <p>
              You can be assured that shopping with ThomasGroceryStore is safe!
              We’re a member of "Verified by Visa" and "Secure by MasterCard",
              providing additional security when using your payment cards
              online. We use industry-standard encryption systems for
              potentially sensitive information, such as your name, address and
              other critically sensitive information like your credit / debit
              card details. Information passed between your computer and our
              website cannot be read in the event of someone else intercepting
              it.
            </p>
          </Panel>
          <Panel
            header="Why can't certain items be delivered to my address"
            key="6"
          >
            <p>
              We’re unable to ship certain products overseas. This can be due to
              legal or logistical restrictions that prevent us from sending
              products overseas. Items can include fresh, vegetables, fruits and
              some liquids. If we cannot ship a product outside of VN, we’ll
              always specify on the product page. We’ll also notify you at
              checkout if there are any restricted items in your shopping bag.
              If you’ve added an item to your bag that can’t be shipped to your
              address, the order won’t be completed. To complete your order,
              you’ll need to remove any items that can’t be shipped to your
              delivery address.
            </p>
          </Panel>
          <Panel header="Student discount" key="7">
            <p>
              Calling all students - get discount off your order! Simply
              register with Student Beans here to verify your student status and
              get your student discount today!
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default AppFAQ;
