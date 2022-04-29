import React, { useEffect, useState, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FavoriteContext } from "../model/FavoriteProvider";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

function MusicVideoPage() {
  const { favoriteData, handleLike } = useContext(FavoriteContext);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPlay, setCurrentPlay] = useState({
    id: -1,
    audio: null,
  });

  console.log(data);

  useEffect(() => {
    console.log(currentPlay);
  }, [currentPlay]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${search}&entity=musicVideo&limit=10`
      ).then((r) => r.json());
      console.log(response);
      if (!response.results || response.resultCount === 0) {
        throw "검색 실패 !";
      } else if (response.results) {
        setData(response.results);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", marginBottom: 20, justifyContent: "center" }}
      >
        <TextField
          variant="outlined"
          label="Music Movie Search"
          type="search"
          style={{ width: 450 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginLeft: 20, height: 56 }}
        >
          Search
        </Button>
      </form>
      <div style={{ marginTop: "10px", width: "100%" }}>
        {data.map((v, i) => (
          <Card
            key={i}
            sx={{ maxWidth: "100%" }}
            style={{ marginBottom: "10px" }}
          >
            <CardMedia
              component="video"
              height="300"
              src={v.previewUrl}
              autoPlay
              muted
              loop
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {v.trackName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                아티스트 : {v.artistName}
                <br />
                앨범 가격 : {v.trackPrice} {v.currency}
                <br />
                발매 날짜 : {v.releaseDate}
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() =>
                  handleLike(
                    v.trackId,
                    v.trackName,
                    v.artistName,
                    v.artworkUrl100,
                    v.previewUrl
                  )
                }
              >
                {favoriteData[v.trackId]?.like ? (
                  <Favorite style={{ fontSize: "16px" }} />
                ) : (
                  <FavoriteBorder style={{ fontSize: "16px" }} />
                )}
              </Button>
              <Button
                size="small"
                onClick={() => {
                  if (currentPlay.id !== -1 && currentPlay.id !== v.trackId) {
                    alert("이미 다른 곡이 재생중입니다.");
                    return;
                  }

                  if (currentPlay.id === -1) {
                    const audio = new Audio(v.previewUrl);
                    audio.play();
                    audio.addEventListener("ended", () =>
                      setCurrentPlay({
                        id: -1,
                        audio: null,
                      })
                    );
                    setCurrentPlay({
                      id: v.trackId,
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
                {currentPlay.id === v.trackId ? "■ 멈춤" : "▶︎ 미리 듣기"}
              </Button>
              <Button
                size="small"
                onClick={() => window.open(v.trackViewUrl, "_blank")}
              >
                공식 홈페이지 이동
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MusicVideoPage;
