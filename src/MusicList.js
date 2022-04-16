import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';

export default class MusicList extends React.Component {
    render () {
        return (
            <div>
                {this.props.list.results.map(item => {
                    return (
                    <Card key={item.collectionId}>
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

//map을 통해 list item 돌릴 때 card item에 대해 key가 있어야함 (warning 뜸)
