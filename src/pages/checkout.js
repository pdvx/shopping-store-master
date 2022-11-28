import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../components/common/input';
import { Button, Col, InputNumber } from 'antd';

const useQuery = () => new URLSearchParams(useLocation().search);

const Checkout = () => {
  const query = useQuery();
  const cartId = query.get('id');
  const [form, setForm] = useState({});
  const [cart, setCart] = useState({});
  const urlApi = 'http://localhost:8765';
  const checkoutSuccess = query.get('success') + '' === '1';

  useEffect(() => {
    if (!cartId) return alert('Thông tin không hợp lệ');

    const fetchCart = async () => {
      const url = `${urlApi}/carts/${cartId}`;
      const { data: resp } = await axios(url);
      if (!resp?._id) return alert('Thông tin không hợp lệ');
      setCart(resp);
      setForm(resp?.shippingInformation);
      console.log('-> resp?.shippingInformation', resp?.shippingInformation);
    };

    fetchCart();
  }, [cartId]);

  const onChange = ({ target: { id, value } }) =>
    setForm((f) => ({ ...f, [id]: value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.phone || !form.address)
      return alert('Please enter phone and address');

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

    alert('Success');
    window.location.reload();
  };

  return (
    <div className="container mx-auto">
      <div className="flex -mx-1 py-8">
        <form className="p-1 w-2/3">
          <div className="p-4 bg-white border rounded">
            <div className="mb-2">Shipping information</div>
            <Input
              id={'name'}
              label={'Name'}
              onChange={onChange}
              value={form?.name || ''}
              disabled={checkoutSuccess}
            />
            <Input
              id={'phone'}
              label={'Phone number'}
              onChange={onChange}
              value={form?.phone || ''}
              disabled={checkoutSuccess}
            />
            <Input
              id={'address'}
              label={'Address'}
              onChange={onChange}
              value={form?.address || ''}
              disabled={checkoutSuccess}
            />
            <Input
              id={'note'}
              label={'Note'}
              disabled={checkoutSuccess}
              onChange={onChange}
              value={form?.note || ''}
            />
            {!checkoutSuccess && (
              <div className="flex justify-center w-full mt-4">
                <Button onClick={onSubmit} type="submit" type="primary">
                  Order
                </Button>
              </div>
            )}
          </div>
        </form>
        <div className="p-1 w-1/3">
          <div className="p-4 bg-white border rounded">
            {(cart?.products || []).map((product, indexProduct) => {
              return (
                <Col xs={24}>
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
                        Price: {product?.product?.price || 0 * product.quantity}{' '}
                        $
                      </h3>
                    </div>
                  </div>
                </Col>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
