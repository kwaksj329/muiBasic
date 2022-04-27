import React, { useState } from 'react';

import MusicList from './MusicList';
import firebase from './firebase';


const FavoriteList = () => {
    const [favorite_list, setFavoriteList] = useState([]);

    React.useEffect(() => {
        let db = firebase.firestore();
        db.collection('likes').get().then(docs => {
            docs.forEach(doc => {
                setFavoriteList(favorite_list => [...favorite_list, doc.data()]);
                console.log(favorite_list);
            })
        }).catch(e => console.log(e));
    }, []);

    return (
        <div>
            <MusicList list={{results :favorite_list}}> </MusicList> 
        </div>
    );
}

export default FavoriteList;