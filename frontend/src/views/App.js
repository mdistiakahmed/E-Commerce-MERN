import "./App.css";
import Header from "./component/layout/header/Header";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Footer from "./component/layout/footer/Footer";
import store from "../store/store";
import { loadUser } from "../store/user/userAction";
import UserOptions from "./component/layout/header/UserOptions";
import { useSelector } from "react-redux";
import RoutesHandler from "./Routes";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <RoutesHandler />

      <Footer />
    </div>
  );
}

export default App;
