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

class TopList extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        const {classes} = this.props;
        let index = 1;
        return (
            <div>
                {this.props.list.map(item => {
                    console.log(item.id.attributes);
                    return (
                    <Card align="center" key={item.id.attributes.im} className={classes.card}>
                        <CardContent>
                            <img src = {item['im:image'][2].label}/>
                            <Typography variant="title"> {item.title.label}</Typography>
                        </CardContent>
                    </Card>);
                })}
            </div>
        );
    }
}

export default withStyles(styles)(TopList);