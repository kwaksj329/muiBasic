import React, { useState } from "react";
import { AppBar, Typography, Box } from "@material-ui/core";
import SideBar from "./component/SideBar";
import MusicSearchPage from "./page/MusicSearchPage";
import TopListPage from "./page/TopListPage";
import FavoriteListPage from "./page/FavoriteListPage";
import MusicVideoPage from "./page/MusicVideoPage";
import RecommendPage from "./page/RecommendPage";
import FavoriteProvider from "./model/FavoriteProvider";

function TabPanel({ children }) {
  return (
    <Box
      sx={{
        p: 3,
        position: "absolute",
        marginLeft: "130px",
        marginTop: "60px",
        display: "flex",
        width: "85vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{children}</Typography>
    </Box>
  );
}

function App() {
  const [page, setPage] = useState(0);

  return (
    <FavoriteProvider>
      <AppBar position="fixed">
        <Typography align="center" variant="h3" color="inherit">
          Your Favorite Musics
        </Typography>
      </AppBar>
      <SideBar onPageSelect={(page) => setPage(page)} />
      {page === 0 && (
        <TabPanel>
          <TopListPage />
        </TabPanel>
      )}
      {page === 1 && (
        <TabPanel>
          <MusicSearchPage />
        </TabPanel>
      )}
      {page === 2 && (
        <TabPanel>
          <MusicVideoPage />
        </TabPanel>
      )}
      {page === 3 && (
        <TabPanel>
          <RecommendPage />
        </TabPanel>
      )}
      {page === 4 && (
        <TabPanel>
          <FavoriteListPage />
        </TabPanel>
      )}
    </FavoriteProvider>
  );
}
export default App;
