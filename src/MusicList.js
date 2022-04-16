import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core';

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
    render () {
        const {classes} = this.props;
        return (
            <div className={classes}>
                {this.props.list.results.map(item => {
                    return (
                    <Card key={item.collectionId} className={classes.card}>
                        <CardContent>
                            <Typography variant="subtitle1"> {item.artistName}</Typography>
                            <Typography variant="subtitle2"> {item.collectionCensoredName}</Typography>
                        </CardContent>
                    </Card>)
                })}
            </div>

        );
    }
}
export default withStyles(styles)(MusicList);
//map을 통해 list item 돌릴 때 card item에 대해 key가 있어야함 (warning 뜸)
