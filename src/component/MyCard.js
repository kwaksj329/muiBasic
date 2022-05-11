import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { FavoriteContext } from "../model/FavoriteProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseArrowIcon from "@mui/icons-material/Pause";

function MyCard({ trackId, trackName, artistName, previewUrl, img, isLike }) {
  const { handleLike } = useContext(FavoriteContext);
  const [audio, setAudio] = useState(null);

  const hanldePlay = () => {
    if (audio === null) {
      const _audio = new Audio(previewUrl);
      _audio.play();
      _audio.addEventListener("ended", () => {
        setAudio((_audio) => {
          _audio.pause();
          return null;
        });
      });
      setAudio(_audio);
    } else {
      setAudio((_audio) => {
        _audio.pause();
        return null;
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 650, marginBottom: "10px" }}>
      <CardHeader
        avatar={<img src={img} />}
        title={
          <>
            {trackName}{" "}
            <IconButton
              aria-label="add to favorites"
              onClick={() =>
                handleLike(trackId, trackName, artistName, img, previewUrl)
              }
            >
              {isLike === true ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton
              aria-label="add to favorites"
              onClick={() => hanldePlay(previewUrl)}
            >
              {audio === null ? <PlayArrowIcon /> : <PauseArrowIcon />}
            </IconButton>
          </>
        }
        subheader={artistName}
      ></CardHeader>
    </Card>
  );
}
export default MyCard;
