import "./App.css";
import Header from "./component/layout/header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/user/LoginSignUp";
import store from "../store/store";
import { loadUser } from "../store/actions/userAction";
import UserOptions from "./component/layout/header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/user/Profile";
import ProtectedRoute from "./component/route/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/OrderSuccess";
import MyOrders from "./component/order/MyOrders";
import OrderDetails from "./component/order/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import Contact from "./component/layout/contact/Contact";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/product/:id" element={<ProductDetails />} exact />
        <Route path="/products" element={<Products />} exact />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} exact />
        <Route path="/contact" element={<Contact />} exact />
        <Route
          path="/account"
          element={<ProtectedRoute component={<Profile />} />}
          exact
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute component={<UpdateProfile />} />}
          exact
        />

        <Route
          path="/password/update"
          element={<ProtectedRoute component={<UpdatePassword />} />}
          exact
        />
        <Route path="/password/forgot" element={<ForgotPassword />} exact />
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
          exact
        />
        <Route path="/cart" element={<Cart />} exact />
        <Route
          path="/shipping"
          element={<ProtectedRoute component={<Shipping />} />}
          exact
        />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute
                component={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            }
            exact
          />
        )}

        <Route
          path="/success"
          element={<ProtectedRoute component={<OrderSuccess />} />}
          exact
        />

        <Route
          path="/orders"
          element={<ProtectedRoute component={<MyOrders />} />}
          exact
        />

        <Route
          path="/order/confirm"
          element={<ProtectedRoute component={<ConfirmOrder />} />}
          exact
        />

        <Route
          path="/order/:id"
          element={<ProtectedRoute component={<OrderDetails />} />}
          exact
        />

        <Route path="/login" element={<LoginSignUp />} exact />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} component={<Dashboard />} />}
          exact
        />
        <Route path="/admin/products" element={<ProductList />} exact />
        <Route path="/admin/product" element={<NewProduct />} exact />
        <Route path="/admin/product/:id" element={<UpdateProduct />} exact />
        <Route path="/admin/orders" element={<OrderList />} exact />
        <Route path="/admin/order/:id" element={<ProcessOrder />} exact />
        <Route path="/admin/users" element={<UsersList />} exact />
        <Route path="/admin/user/:id" element={<UpdateUser />} exact />
        <Route path="/admin/reviews" element={<ProductReviews />} exact />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
