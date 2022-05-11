import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchTab from './SearchTab';
import TopList from './TopList';
import FavoriteList from './FavoriteList';
import MvList from "./MvList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function LeftVerticalTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const [topList, setTopList] = React.useState([]);
  const handleTop100 = (event) => {
    event.preventDefault();
    fetch(`https://itunes.apple.com/us/rss/topsongs/limit=100/json`).then(r => r.json()).then(r => {
      console.log(r.feed.entry);
      setTopList(topList => [...topList, ...r.feed.entry]);
    }).catch(e => console.log('error when search musician'));
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="SEARCH" {...a11yProps(0)} />
        <Tab label="TOP100" {...a11yProps(1)} onClick={handleTop100} />
        <Tab label="MV LIST" {...a11yProps(2)} />
        <Tab label="FAVORITE" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SearchTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
      { topList && topList.length > 0 && 
        <TopList list={topList}>
        </TopList>
      }
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MvList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FavoriteList/>
      </TabPanel>
    </Box>
  );
}