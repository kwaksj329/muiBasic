import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {Favorite, FavoriteBorder} from '@material-ui/icons';
import firebase from './firebase';
import SnackbarMsg from './snackmsg';


//styles = 함수
const styles = theme => ({
    content : {},
    layout : {
        display : 'flex',
        justifyContent : 'center'
    },
    card: {
        minWidth: 275,
        maxWidth: 600,
        marginBottom : 20,
        marginLeft : 'auto',
        marginRight : 'auto',
    },
});

class MusicList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes : {},
            snackbar : {},
        };
    }

    //id가 들어오면 함수를 return
    toggleFavorite = (id) => () => {
        let {likes} = this.state;
        console.log(id, likes[id]);
        if(likes[id] == undefined) {
            likes[id] = true;
        }
        else {
            likes[id] = (likes[id]) ? false : true;
        }

        let db = firebase.firestore();
        db.collection('likes').doc(String(id)).set({like : likes[id]});
        
        /*
        try {
            let ref = db.collection('likes').doc(String(id));
            ref.get().then((doc) => {
                if (doc.exists) {
                    console.log('document data : ', doc.data());    
                }
                else {
                    console.log('No Such Document')
                }
            }).catch((e) => {
                console.log('Error while accessing Firestore : ' + e);
            });
        }
        catch (e) {
            console.log('Error Occurred : '+ e);
        } 
        */

        this.setState({likes, snackbar : {open : true, msg : `id ${id} clicked`}});
    }

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
      
          this.setState({snackbar : {open : false, msg : ''}});
    }       

    render () {
        const {classes} = this.props;
        return (
            <div>
                {this.props.list.results.map(item => {
                    return (
                    <Card key={item.collectionId} className={classes.card}>
                        <CardContent>
                            <Typography variant="subtitle1"> {item.artistName}</Typography>
                            <Typography variant="subtitle2"> {item.collectionCensoredName}</Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={this.toggleFavorite(item.collectionId)}>
                            {this.state.likes[item.collectionId] ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                        </CardActions>
                    </Card>)
                })}
                <SnackbarMsg open={this.state.snackbar.open} message={this.state.snackbar.msg} onClose={this.handleSnackbarClose}></SnackbarMsg>
            </div>

        );
    }
}
export default withStyles(styles)(MusicList);
//map을 통해 list item 돌릴 때 card item에 대해 key가 있어야함 (warning 뜸)
//this.toggleFavorite(item.collectionId) 은 함수 호출 아님! javascript의 closure와 유사함, this 꼭 붙여야함
//react는 ui의 변화를 state를 통해서 해야함, state 변경시 react가 이를 감지하고 다시 draw함
//class 스타일에서는 setState, funcion 스타일에서는 useState 사용