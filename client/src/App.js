import "./App.css";
import Routes from "./config/Routes/Routes";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/touch-loader/touchLoader";
import React, { useEffect, useState } from "react";
import Myloader from "react-spinners/ClipLoader";
import NotFound from "./pages/Errors/NotFound";
import Login  from "./components/Authetication/Login/Login";
import Register  from "./components/Authetication/Register/Register";
import UserProfile from "./pages/userProfile/userProfile";
import Review from "./components/review/review";

function App() {
  const [spinner, setSpinner] = useState(true);

  // eslint-disable-next-line
  let [color, setColor] = useState("grey");

  useEffect(() => {
    setTimeout(() => setSpinner(false), 500);
  }, []);
  return (
    <>
      {!spinner ? (
        <BrowserRouter>
          <Switch>
            <Route exact path="/error" component={NotFound} />
            <Route path="/userProfile" component={UserProfile} exact />
            <Route path="/:movie/:reviewId" component={Review} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/" component={Routes} />
          </Switch>
        </BrowserRouter>
      ) : (
        <div className="load_app" style={{ height: "400px" }}>
          <Myloader
            color={color}
            size={80}
            className="m__load"
            speedMultiplier={1.5}
          />
        </div>
      )}
    </>
  );
}

export default App;
