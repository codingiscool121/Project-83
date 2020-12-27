import React from 'react';
import {Header} from 'react-native-elements';

const MyHeader = props=>{
    return(
        <Header
         centerComponent={{text:props.title, style:{color:"aqua", fontSize: 30, fontWeight:"bold"}}}
         >
        </Header>
    )
}

export default MyHeader;