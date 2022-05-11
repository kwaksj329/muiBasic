import firebase from "../config/firebase";
import SnackbarMsg from "../component/snackmsg";
import React, { useState, createContext, useEffect } from "react";

export const FavoriteContext = createContext();

function FavoriteProvider({ children }) {
  const [favoriteData, setFavoriteData] = useState({});
  const [snakbar, setSnackBar] = useState({
    open: false,
    msg: "",
  });

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const db = firebase.firestore();
    const ref = await db.collection("likes").get();
    const data = {};
    ref.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    console.log("AA", data);
    setFavoriteData(data);
  };

  const handleLike = async (id, trackName, artistName, img, previewUrl) => {
    const db = firebase.firestore();
    const ref = await db.collection("likes").doc(String(id));
    const item = await ref.get();
    if (item.exists && item.data().like === true) {
      await ref.delete();
    } else {
      ref.set({ like: true, trackName, artistName, img, previewUrl });
      setSnackBar({
        open: true,
        msg: `id ${item.id} saved`,
      });
    }
    await fetch();
  };

  return (
    <FavoriteContext.Provider value={{ handleLike, favoriteData }}>
      {children}
      <SnackbarMsg
        open={snakbar.open}
        message={snakbar.msg}
        onClose={(e, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setSnackBar({
            ...snakbar,
            open: false,
          });
        }}
      ></SnackbarMsg>
    </FavoriteContext.Provider>
  );
}

export default FavoriteProvider;
