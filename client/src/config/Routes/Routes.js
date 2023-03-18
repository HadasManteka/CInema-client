import Home from "../../pages/Home/Home";
import Movies from "../../pages/Movies/Movies";
import { Redirect, Route, Switch } from "react-router-dom";
import SinglePage from "../../components/SingleContentPage/SinglePage";
import MainNav from "../../components/MainNavbar/MainNav";
import Footer from "../../components/Footer/Footer";
import CopyWrite from "../../components/CopyWrite__footer/LastFooter";
import MovieGraph from "../../components/Graph/MovieGraph";
import {AuthContext} from "../../components/context/UserContext";
import React, {useContext} from "react";

const Routes = () => {
  const {isAdmin} = useContext(AuthContext);

  return (
    <>
      <MainNav />

      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/all-movies" component={Movies} />
          {isAdmin ? 
          <Route path="/Statistics" component={MovieGraph} /> : <Redirect to="/error" />
          }
          <Route path="/movie/:id" children={<SinglePage />} />
          <Redirect to="/error" />
        </Switch>
      </div>
      <Footer />
      <CopyWrite />
    </>
  );
};

export default Routes;
