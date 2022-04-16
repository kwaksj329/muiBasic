import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {Favorite, FavoriteBorder} from '@material-ui/icons';

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

    //id가 들어오면 함수를 return
    toggleFavorite = (id) => () => {
        let item = this.props.list.results.find((album) => {return album.collectionId == id})
        item.like = true;
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
                            {item.like ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                        </CardActions>
                    </Card>)
                })}
            </div>

        );
    }
}
export default withStyles(styles)(MusicList);
//map을 통해 list item 돌릴 때 card item에 대해 key가 있어야함 (warning 뜸)
//this.toggleFavorite(item.collectionId) 은 함수 호출 아님! javascript의 closure와 유사함, this 꼭 붙여야함
