import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { FavoriteContext } from "../model/FavoriteProvider";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Download from "@mui/icons-material/Download";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseArrowIcon from "@mui/icons-material/Pause";
import ArrowForward from "@mui/icons-material/ArrowForward";
export default function Recommend() {
  const { favoriteData, handleLike } = useContext(FavoriteContext);

  const [list, setList] = useState([]);
  const [currentPlay, setCurrentPlay] = useState({
    id: -1,
    audio: null,
  });
  useEffect(() => {
    fetch(`https://itunes.apple.com/us/rss/topsongs/limit=100/json`)
      .then((v) => v.json())
      .then((v) => {
        const Arr = v.feed.entry;
        const temp = [];
        for (let i = 0; i < 5; i++) {
          const random = Math.floor(Math.random() * Arr.length);
          temp.push(Arr[random]);
        }
        setList(temp);
      })
      .catch((e) => console.log("error when search musician"));
  }, []);

  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div style={{ width: "85vw" }}>
      <h1 style={{ textAlign: "center" }}>오늘의 추천 5곡🎧</h1>
      {list.map((v, i) => (
        <>
          {v && (
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                border: "1px solid black",
              }}
              key={i}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ marginLeft: "40%" }}>
                  <div style={{ display: "flex" }}>
                    <img
                      src={v["im:image"][0]["label"]}
                      style={{ marginRight: "10px" }}
                    />
                    <Typography
                      component="div"
                      variant="h5"
                      style={{ marginTop: "10px" }}
                    >
                      {v["title"]["label"].split("-", 1)}
                    </Typography>
                  </div>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    <div style={{ marginTop: "10px" }}>
                      가수 : {v["im:artist"]["label"]}
                    </div>
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {console.log(v["im:releaseDate"])}
                    출시일 : {v["im:releaseDate"]?.label?.substr(0, 4)}년{" "}
                    {v["im:releaseDate"]?.label?.substr(5, 2)}월{" "}
                    {v["im:releaseDate"]?.label?.substr(8, 2)}일
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    앨범 가격 :{" "}
                    {Math.floor(v["im:price"].attributes.amount * 1267)}원
                  </Typography>
                </CardContent>
                <Box sx={{ width: "70vw", marginLeft: "50%", pl: 1, pb: 1 }}>
                  <IconButton
                    aria-label="like"
                    onClick={() =>
                      handleLike(
                        v.id.attributes["im:id"],
                        v.title.label,
                        v["im:artist"]["label"],
                        v["im:image"][2].label,
                        v["link"][1]["attributes"]["href"]
                      )
                    }
                  >
                    {favoriteData[v.id.attributes["im:id"]]?.like ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>

                  <IconButton
                    aria-label="download"
                    onClick={() => {
                      return window.open(v["link"][1].attributes.href);
                    }}
                  >
                    <Download sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton
                    aria-label="play/pause"
                    onClick={() => {
                      if (
                        currentPlay.id !== -1 &&
                        currentPlay.id !== v.id.attributes["im:id"]
                      ) {
                        alert("이미 다른 곡이 재생중입니다.");
                        return;
                      }

                      if (currentPlay.id === -1) {
                        const audio = new Audio(v.link[1].attributes.href);
                        audio.play();
                        audio.addEventListener("ended", () =>
                          setCurrentPlay({
                            id: -1,
                            audio: null,
                          })
                        );
                        setCurrentPlay({
                          id: v.id.attributes["im:id"],
                          audio: audio,
                        });
                      } else {
                        currentPlay.audio.pause();
                        setCurrentPlay({
                          id: -1,
                          audio: null,
                        });
                      }
                    }}
                  >
                    {currentPlay.id === v.id.attributes["im:id"] ? (
                      <PauseArrowIcon sx={{ height: 38, width: 38 }} />
                    ) : (
                      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    )}
                  </IconButton>

                  <IconButton
                    aria-label="ArrowForward"
                    onClick={() => {
                      return window.open(v["id"].label, "_blank");
                    }}
                  >
                    <ArrowForward sx={{ height: 38, width: 38 }} />
                  </IconButton>
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 200 }}
                image={v["im:image"][2]["label"]}
                alt="Live from space album cover"
              />
            </Card>
          )}
        </>
      ))}
    </div>
  );
}
