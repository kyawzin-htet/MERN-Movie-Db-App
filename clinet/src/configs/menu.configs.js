import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main= [
    {
        display: "home",
        path: "/",
        icon: <HomeOutlinedIcon fontSize="15px" />,
        state: "home"
      },
      {
        display: "movies",
        path: "/movie",
        icon: <SlideshowOutlinedIcon fontSize="15px" />,
        state: "movie"
      },
      {
        display: "tv series",
        path: "/tv",
        icon: <LiveTvOutlinedIcon fontSize="15px" />,
        state: "tv"
      },
      {
        display: "search",
        path: "/search",
        icon: <SearchOutlinedIcon fontSize="15px" />,
        state: "search"
      }
];

const user =[
    {
        display: "favorites",
        path: "/favorites",
        icon: <FavoriteBorderOutlinedIcon fontSize="15px" />,
        state: "favorite"
      },
      {
        display: "reviews",
        path: "/reviews",
        icon: <RateReviewOutlinedIcon fontSize="15px" />,
        state: "reviews"
      },
      {
        display: "password update",
        path: "/password-update",
        icon: <LockResetOutlinedIcon fontSize="15px" />,
        state: "password.update"
      }
];

const menuConfigs = { main, user };

export default menuConfigs;