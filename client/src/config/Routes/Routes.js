// import Treading from "../../pages/TreadingShows/Treading";
import Home from "../../pages/Home/Home";
// import Movies from "../../pages/Movies/Movies";
// import TvSeries from "../../pages/TvSeries/TvSeries";
import { Redirect, Route, Switch } from "react-router-dom";
// import SinglePage from "../../components/SingleContentPage/SinglePage";
import MainNav from "../../components/MainNavbar/MainNav";
import Footer from "../../components/Footer/Footer";
import CopyWrite from "../../components/CopyWrite__footer/LastFooter";
import UserProfile from "../../pages/userProfile/userProfile";

const Routes = () => {
  return (
    <>
      <MainNav />

      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/all-movies" component={Movies} />
          <Route path="/treading" component={Treading} />
          <Route path="/all-series" component={TvSeries} /> */}
          <Route path="/userProfile" component={UserProfile} />
          <Redirect to="/error" />
        </Switch>
      </div>
      <Footer />
      <CopyWrite />
    </>
  );
};

export default Routes;
