import Home from "../../pages/Home/Home";
import Movies from "../../pages/Movies/Movies";
import { Redirect, Route, Switch } from "react-router-dom";
import SinglePage from "../../components/SingleContentPage/SinglePage";
import MainNav from "../../components/MainNavbar/MainNav";
import Footer from "../../components/Footer/Footer";
import CopyWrite from "../../components/CopyWrite__footer/LastFooter";
import UserProfile from "../../pages/userProfile/userProfile";
import MovieGraph from "../../components/Graph/MovieGraph";
import Review from "../../pages/review/review";

const Routes = () => {
  return (
    <>
      <MainNav />

      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/all-movies" component={Movies} />
          <Route path="/Statistics" component={MovieGraph} />
          <Route path="/userProfile" component={UserProfile} />
          <Route path="/review/:movieId/:reviewId" component={Review} />
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
