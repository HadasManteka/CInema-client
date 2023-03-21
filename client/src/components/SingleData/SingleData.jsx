import { useHistory } from "react-router-dom";
import { unavailable } from "../../api/config/DefaultImages";
import "./SingleData.css";
import MuiPlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { styled } from "@mui/material/styles";

const PlayArrowRoundedIcon = styled(MuiPlayArrowRoundedIcon)(`

  &.MuiSvgIcon-root{
    color:#abb7c4 ;
  },  &.MuiSvgIcon-root:hover {
    color: #d13131 ;
  }
  
`);
const SingleData = ({
  img_url,
  _id,
  rating,
  mediaType,
  media_type,
}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${mediaType || media_type}/${_id}`);
  };
  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <>
      <div
        style={{ color: "white" }}
        className="SingleDataMedia"
        onClick={handleClick}
      >
        <span className={` tag ${setVoteClass(rating)} vote__tag`}>
          {Math.round(rating * 10) / 10}
        </span>

        <img
          src={img_url ? img_url : unavailable}
          alt=""
        />
        <div className="read__more">
          <PlayArrowRoundedIcon
            style={{
              border: "2px solid #abb7c4",
              borderRadius: "50px",
              fontSize: "3.2rem",
              cursor: "pointer",
            }}
            className="play__btn"
          />
          {/* <button >Read More</button> */}
        </div>
      </div>
    </>
  );
};

export default SingleData;
