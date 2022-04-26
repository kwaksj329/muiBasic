import React, { Component } from 'react';
//import './App.css';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {AppBar, Typography, TextField, Button, Input, Tabs, Tab} from '@material-ui/core/';
//import Toolbar from '@material-ui/core/Toolbar';
//import MenuIcon from '@material-ui/icons/Menu';
//import IconButton from '@material-ui/core/IconButton';
//import ExitToApp from '@material-ui/icons/ExitToApp';
//import Drawer from '@material-ui/core/Drawer';
//import Forms from './Forms';
//import HomeIcon from '@material-ui/icons/Home';
//import Typography from '@material-ui/core/Typography';
import MusicList from './MusicList';
import music_list from './data';
//import { TabPanel } from '@material-ui/lab';
import Box from '@material-ui/core/Box';

//App Component
export default class LeftVerticalTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue : 0,
        }
    }

    a11yProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleTabs = (event, newValue) => {
        this.setState({ value: newValue });
    }

    render () {
        return (
            <div>
                <form>
                    <div style={{display: 'flex', marginBottom: 20}}>
                        <AppBar position="static">
                        <Tabs value={this.state.tabValue} onChange={this.handleTabs} aria-label="simple tabs example">
                            <Tab label="Item One" {...this.a11yProps(0)}/>
                            <Tab label="Item Two" {...this.a11yProps(1)}/>
                            <Tab label="Item Three" {...this.a11yProps(2)}/>
                        </Tabs>
                        </AppBar>
                        <TabPanel value={this.state.tabValue} index={0}>Item One</TabPanel>
                        <TabPanel value={this.state.tabValue} index={1}>Item Two</TabPanel>
                        <TabPanel value={this.state.tabValue} index={2}>Item Three</TabPanel>
                    </div>
                </form>  
            </div>
        );
    }
}

class TabPanel extends Component {
    render() {
      return (
        <Typography component="div" hidden={this.props.value !== this.props.index}>
          <Box p={3}>{this.props.children}</Box>
        </Typography>
      );
    }
  }