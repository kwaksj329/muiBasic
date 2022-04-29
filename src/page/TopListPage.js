import React, { useState, useEffect, useContext } from "react";
import { FavoriteContext } from "../model/FavoriteProvider";
import MyCard from "../component/MyCard";
function TopListPage() {
  const [list, setList] = useState([]);
  const { favoriteData } = useContext(FavoriteContext);

  useEffect(() => {
    fetch(`https://itunes.apple.com/us/rss/topsongs/limit=50/json`)
      .then((v) => v.json())
      .then((v) => {
        console.log(v);
        setList(v.feed.entry);
      })
      .catch(() => console.log("error when search musician"));
  }, []);

  return (
    <div>
      {list.map((item, idx) => (
        <>
          <h2>{idx + 1}위</h2>
          <MyCard
            trackId={item.id.attributes["im:id"]}
            trackName={item.title.label}
            artistName={item["im:artist"].label}
            img={item["im:image"][2].label}
            previewUrl={item["link"][1]["attributes"]["href"]}
            key={idx}
            isLike={favoriteData[item.id.attributes["im:id"]]?.like}
          />
        </>
      ))}
    </div>
  );
}

export default TopListPage;
