import React, { useState, useContext, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import MyCard from "../component/MyCard";
import { FavoriteContext } from "../model/FavoriteProvider";

function MusicSearchPage() {
  const [musicList, setMusicList] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const { favoriteData } = useContext(FavoriteContext);

  useEffect(() => {
    console.log("AA3", favoriteData);
  }, [favoriteData]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchWord("");
    fetch(`https://itunes.apple.com/search?term=${searchWord}&entity=song`)
      .then((r) => r.json())
      .then((r) => {
        console.log(r.results);
        setMusicList(r.results);
      })
      .catch(() => console.log("error when search musician"));
  };

  return (
    <div>
      <form
        style={{ display: "flex", marginBottom: 20, justifyContent: "center" }}
        onSubmit={handleSearch}
      >
        <TextField
          variant="outlined"
          label="Music Song Search"
          type="search"
          style={{ width: 450 }}
          onChange={(e) => setSearchWord(e.target.value)}
          value={searchWord}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginLeft: 20 }}
        >
          Search
        </Button>
      </form>

      <div>
        {musicList.map((item, idx) => (
          <MyCard
            trackId={item.trackId}
            trackName={item.trackName}
            artistName={item.artistName}
            img={item.artworkUrl100}
            previewUrl={item.previewUrl}
            key={idx}
            isLike={favoriteData[item.trackId]?.like}
          />
        ))}
      </div>
    </div>
  );
}

export default MusicSearchPage;
