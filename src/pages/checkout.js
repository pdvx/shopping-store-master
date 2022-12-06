import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../components/common/input';
import { Button, Col, InputNumber, Form, Row, message } from 'antd';

const useQuery = () => new URLSearchParams(useLocation().search);

const Checkout = () => {
  const query = useQuery();
  const cartId = query.get('id');
  const [form, setForm] = useState({});
  const [cart, setCart] = useState({});
  const urlApi = 'http://localhost:8765';
  const checkoutSuccess = query.get('success') + '' === '1';

  useEffect(() => {
    if (!cartId) return message.warn('Please check your information');

    const fetchCart = async () => {
      const url = `${urlApi}/carts/${cartId}`;
      const { data: res } = await axios(url);
      if (!res?._id) return message.warn('Please check your information');
      setCart(res);
      setForm(res?.shippingInformation);
      console.log('-> resp?.shippingInformation', res?.shippingInformation);
    };

    fetchCart();
  }, [cartId]);

  const onChange = ({ target: { id, value } }) =>
    setForm((f) => ({ ...f, [id]: value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.phone || !form.address)
      return message.warn('Please enter phone and address');

    return submitCart();
  };

  const submitCart = async () => {
    const ORDER_STATUS_CONST = {
      PREPARING: 0,
      IN_PROGRESS: 1,
      DONE: 2,
      AWAITING: 3,
    };

    const requestUpdateCart = {
      status: ORDER_STATUS_CONST.PREPARING,
      userId: sessionStorage.getItem('userId'),
      products: cart.products,
      shippingInformation: form,
    };
    await fetch(`${urlApi}/carts/${cartId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestUpdateCart),
    });

    message.success('Success');
    window.location.reload();
  };

  return (
    <div className="container mx-auto">
      <div className="flex -mx-1 py-8">
        <Row gutter={[24, 24]} className="shipping">
          <Col xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  lg={{ span: 8 }}
                  >
            <Form className="p-1 w-2/3">
              <div className="p-4 bg-white border rounded">
                <h2 className="mb-2">Shipping information</h2>
                <Form.Item>
                  <Input
                    onChange={onChange}
                    name="username"
                    id={'name'}
                    label={'Name'}
                    value={form?.name || ''}
                    disabled={checkoutSuccess}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    id={'phone'}
                    label={'Phone number'}
                    onChange={onChange}
                    value={form?.phone || ''}
                    disabled={checkoutSuccess}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    id={'address'}
                    label={'Address'}
                    onChange={onChange}
                    value={form?.address || ''}
                    disabled={checkoutSuccess}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    id={'note'}
                    label={'Note'}
                    disabled={checkoutSuccess}
                    onChange={onChange}
                    value={form?.note || ''}
                  />
                </Form.Item>

                {!checkoutSuccess && (
                  <div className="flex justify-center w-full mt-4">
                    <Button onClick={onSubmit} type="submit primary">
                      Order
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          </Col>
                
                <Col xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  lg={{ span: 6 }}
                  >
                    </Col>
                
          <div>
          <Col xs={24} lg={ 24}>
            <div className=" bg-white border rounded">
              {(cart?.products || []).map((product, indexProduct) => {
                return (
                  
                    <div
                      style={{
                        display: 'flex',
                        padding: '20px 0',
                        paddingTop: indexProduct === 0 ? '0px' : '20px',
                        width: '100%',
                        borderBottom:
                          indexProduct === cart.products.length - 1
                            ? 'none'
                            : '1px solid #ccc',
                      }}
                    >
                      <img
                        src={product?.product?.image}
                        alt={product?.product?.title}
                        height="100px"
                        width="100px"
                      />
                      <div style={{ margin: '20px' }}>
                        <h3 className="">{product?.title}</h3>
                        <p>
                          {'Quantity: '}
                          <InputNumber
                            value={product?.quantity}
                            min={0}
                            max={99}
                            disabled
                          />
                        </p>
                        <h3 className="productCost">
                          Price:{' '}
                          {product?.product?.price || 0 * product.quantity} $
                        </h3>
                      </div>
                    </div>
                  
                );
              })}
            </div>
            </Col>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
