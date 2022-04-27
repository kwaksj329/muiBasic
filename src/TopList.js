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

    constructor(props) {
        super(props);
    }

    render () {
        const {classes} = this.props;
        return (
            <div>
                {this.props.list.entry.map(item => {
                    return (
                        {/*}
                    <Card key={item.collectionId} className={classes.card}>
                        <CardContent>
                            
                            <Typography variant="subtitle1"> {item.artistName}</Typography>
                            <Typography variant="subtitle2"> {item.collectionCensoredName}</Typography>
                            </Card>
                        </CardContent>
                    </Card>*/})
                })}
            </div>
        );
    }
}

export default withStyles(styles)(MusicList);