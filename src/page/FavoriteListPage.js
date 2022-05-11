import React, { useContext } from "react";
import MyCard from "../component/MyCard";

import { FavoriteContext } from "../model/FavoriteProvider";

function FavoriteListPage() {
  const { favoriteData } = useContext(FavoriteContext);
  console.log();
  return (
    <div>
      {Object.entries(favoriteData).map((item) => (
        <MyCard
          trackId={item[0]}
          trackName={item[1].trackName}
          artistName={item[1].artistName}
          img={item[1].img}
          previewUrl={item[1].previewUrl}
          isLike={item[1].like}
        />
      ))}
    </div>
  );
}

export default FavoriteListPage;
