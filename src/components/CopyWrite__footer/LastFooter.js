import "./LastFooter.css";
import $ from "jquery";

const LastFooter = () => {
  $("#toTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
  return (
    <>
      <div className="write__footer">
        <div className="container2 ">
          <span>
            © 2023 Cinemy. All Rights Reserved. Designed by 'the best team'.
          </span>
        </div>
      </div>
    </>
  );
};

export default LastFooter;
