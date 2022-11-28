import 'antd/dist/antd.min.css';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './components/common/header';
import FooterWidget from './components/common/footerWidget';
import FooterCopyright from './components/common/footerCopyright';
import AppHome from './pages/home';
import AppAbout from './pages/about';
import AppShop from './pages/shop';
import AppFAQ from './pages/faq';
import AppSignin from './pages/signIn';
import Product from './pages/product';
import AppContact from './pages/contact';
import { Layout } from 'antd';
import { useState } from 'react';
import AppSignup from './pages/signUp';
import Cart from './pages/cart';
import Checkout from './pages/checkout';

const { Header, Content, Footer } = Layout;

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') ?? null);

  return (
    <Layout className="layout">
      <Router>
        <Header>
          <AppHeader />
        </Header>
        <Content>
          <Routes>
            <Route
              path="/demo/react/antdesign/grocery/signin"
              element={<AppSignin />}
              token={token}
              setToken={setToken}
            />
            <Route
              path="/demo/react/antdesign/grocery/signup"
              element={<AppSignup />}
            />
            <Route
              path="/demo/react/antdesign/grocery/"
              element={<AppHome />}
            />
            <Route
              path="/demo/react/antdesign/grocery/about"
              element={<AppAbout />}
            />
            <Route
              path="/demo/react/antdesign/grocery/shop"
              element={<AppShop />}
            />
            <Route
              path="/demo/react/antdesign/grocery/shop/:id"
              element={<Product />}
            />
            <Route
              path="/demo/react/antdesign/grocery/cart"
              element={<Cart />}
            />
            <Route
              path="/demo/react/antdesign/checkout"
              element={<Checkout />}
            />
            <Route
              path="/demo/react/antdesign/grocery/faq"
              element={<AppFAQ />}
            />
            <Route
              path="/demo/react/antdesign/grocery/contact"
              element={<AppContact />}
            />
          </Routes>
        </Content>
      </Router>
      <Footer>
        <FooterWidget />
        <FooterCopyright />
      </Footer>
    </Layout>
  );
}

export default App;
