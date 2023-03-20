import Heading from "../Header/Heading";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer__container__row">
          <div className="col-fot1">
            <Heading />
            <div className="footer__details">
              <p>Cinemy Movies and Tv Series</p>
              <p>The College Of Management, Israel</p>
              <p>
                call Us: <span>(+972) 534223266</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
