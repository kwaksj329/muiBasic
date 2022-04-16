import React from 'react';
//import './App.css';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
//import MenuIcon from '@material-ui/icons/Menu';
//import IconButton from '@material-ui/core/IconButton';
//import ExitToApp from '@material-ui/icons/ExitToApp';
//import Drawer from '@material-ui/core/Drawer';
//import Forms from './Forms';
//import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import MusicList from './MusicList';
import music_list from './data';

//App Component
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            music_list : music_list
        }
    }
    render () {
        return (
            <div>
                <AppBar position="fixed">
                    <Typography align="center" variant="h3" color="inherit">Your Favorite Musics</Typography>
                </AppBar>
                <div style={{height: 60, width: '100%'}}></div>
                <MusicList list={this.state.music_list}></MusicList>        
            </div>
        );
    }
}

//{}의미 : javascript = jsx 스타일, 밖에 있는 javascript 객체를 참조하기 위해, 어떤 function을 쓰기 위해
//xml 스타일 구문에서 javascript 사용할 때 {this.state.music_list} 사용

//{{height: 60, width: '100%'}} 는 {} 안에 javascript 내용이 오며, 또 안쪽 {}에는 json 객체가 옴