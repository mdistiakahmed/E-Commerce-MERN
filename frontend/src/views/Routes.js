import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./component/home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import Contact from "./component/layout/contact/Contact";
import Profile from "./component/user/Profile";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import OrderDetails from "./component/order/OrderDetails";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import MyOrders from "./component/order/MyOrders";
import OrderSuccess from "./component/cart/OrderSuccess";
import LoginSignUp from "./component/user/LoginSignUp";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import store from "../store/store";
import axios from "axios";
import { loadUser } from "../store/user/userAction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./component/cart/Payment";
import Dashboard from "./component/admin/Dashboard";

function AuthGuard({ isAuthenticated, component }) {
  return isAuthenticated ? component : <Navigate to="/login" />;
}

function AdminGuard({ isAuthenticated, isAdmin, component }) {
  console.log("=================");
  console.log(isAdmin);
  return isAuthenticated && isAdmin ? component : <Navigate to="/" />;
}

export default function RoutesHandler() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/product/:id" element={<ProductDetails />} exact />
      <Route path="/products" element={<Products />} exact />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/search" element={<Search />} exact />
      <Route path="/contact" element={<Contact />} exact />
      <Route path="/password/forgot" element={<ForgotPassword />} exact />
      <Route path="/password/reset/:token" element={<ResetPassword />} exact />
      <Route path="/login" element={<LoginSignUp />} exact />

      <Route
        path="/account"
        element={
          <AuthGuard
            isAuthenticated={isAuthenticated}
            component={<Profile />}
          />
        }
        exact
      />

      <Route
        path="/me/update"
        element={
          <AuthGuard
            isAuthenticated={isAuthenticated}
            component={<UpdateProfile />}
          />
        }
        exact
      />

      <Route
        path="/password/update"
        element={
          <AuthGuard
            isAuthenticated={isAuthenticated}
            component={<UpdatePassword />}
          />
        }
        exact
      />

      <Route
        path="/cart"
        element={
          <AuthGuard isAuthenticated={isAuthenticated} component={<Cart />} />
        }
        exact
      />

      <Route
        path="/shipping"
        element={
          <AuthGuard
            isAuthenticated={isAuthenticated}
            component={<Shipping />}
          />
        }
        exact
      />

      <Route
        path="/success"
        element={
          <AuthGuard
            isAuthenticated={isAuthenticated}
            component={<OrderSuccess />}
          />
        }
        exact
      />

      {stripeApiKey && (
        <Route
          path="/process/payment"
          element={
            <AuthGuard
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
        path="/orders"
        element={
          <AuthGuard
            isAuthenticated={isAuthenticated}
            component={<MyOrders />}
          />
        }
        exact
      />

      <Route
        path="/order/confirm"
        element={
          <AuthGuard
            isAuthenticated={isAuthenticated}
            component={<ConfirmOrder />}
          />
        }
        exact
      />

      <Route
        path="/order/:id"
        element={
          <AuthGuard
            isAuthenticated={isAuthenticated}
            component={<OrderDetails />}
          />
        }
        exact
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminGuard
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            component={<Dashboard />}
          />
        }
        exact
      />
      <Route
        path="/admin/products"
        element={
          <AdminGuard
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            component={<ProductList />}
          />
        }
        exact
      />

      <Route
        path="/admin/product"
        element={
          <AdminGuard
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            component={<NewProduct />}
          />
        }
        exact
      />

      <Route
        path="/admin/product/:id"
        element={
          <AdminGuard
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            component={<UpdateProduct />}
          />
        }
        exact
      />

      <Route
        path="/admin/orders"
        element={
          <AdminGuard
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            component={<OrderList />}
          />
        }
        exact
      />

      <Route
        path="/admin/order/:id"
        element={
          <AdminGuard
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            component={<ProcessOrder />}
          />
        }
        exact
      />

      <Route
        path="/admin/users"
        element={
          <AdminGuard
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            component={<UsersList />}
          />
        }
        exact
      />

      <Route
        path="/admin/user/:id"
        element={
          <AdminGuard
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            component={<UpdateUser />}
          />
        }
        exact
      />

      <Route
        path="/admin/reviews"
        element={
          <AdminGuard
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            component={<ProductReviews />}
          />
        }
        exact
      />
    </Routes>
  );
}
