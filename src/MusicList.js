import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {Favorite, FavoriteBorder} from '@material-ui/icons';

import firebase from './firebase';
import SnackbarMsg from './snackmsg';

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

    toggleFavorite = (item) => () => {
        let {likes} = this.state;
        const id = item.collectionId;
        console.log(id, likes[id]);

        let db = firebase.firestore();
        let ref = db.collection('likes').doc(String(id));
        ref.get().then(doc => {
            if (doc.exists) {
                likes[id] = false;
                ref.delete();
            }
            else {
                likes[id] = true;
                ref.set(item);
            }
        }).catch(e => console.log(e));
        
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
        } */


        this.setState({likes, snackbar : {open : true, msg : `id ${id} clicked`}});
    }

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
      
          this.setState({snackbar : {open : false, msg : ''}});
    }       

    componentDidMount() {
        let {likes} = this.state;
        let db = firebase.firestore();
        let ref = db.collection('likes').get().then(docs => {
            console.log(docs);
            docs.forEach(doc => {
                console.log(doc.id);
                likes[doc.id] = true;
            })
            this.setState({likes});
            console.log('componentDidMount');
            console.log(likes);
        }).catch(e => console.log(e));
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
                            <IconButton onClick={this.toggleFavorite(item)}>
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