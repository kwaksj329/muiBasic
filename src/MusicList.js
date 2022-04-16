import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';

export default class MusicList extends React.Component {
    render () {
        return (
            <div>
                {this.props.list.results.map(item => {
                    return (
                    <Card>
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
