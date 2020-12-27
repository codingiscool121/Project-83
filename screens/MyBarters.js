import React from 'react'
import {View,Text, StyleSheet, FlatList} from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import {Card} from 'react-native-elements';
import {ListItem} from 'react-native-elements';


export default class MyBarters extends React.Component{
    constructor(props){
        super(props)
        this.state={
            UserId: firebase.auth().currentUser.email,
            Username: "",
            GivenItems:[]
        }
        this.requestRef= null
    }
    
    getUserDetails=()=>{
        db.collection('users').where('UserId', '==', this.state.UserId).get()
        .then(snapshot=>{
          snapshot.forEach(doc=>{
              this.setState({
                  Username: doc.data().Username
              })
          })
        })
    }
   
    getNotifications=()=>{
        db.collection('allNotifications').where('ReceiverId', '==', this.state.UserId)
        .onSnapshot(snapshot=>{
            snapshot.docs.map(
                doc=>{
                    var notification = doc.data()
                    notification["docId"]=doc.id
                    GivenItems.push(notification)
                }
            )
            this.setState({
                GivenItems:GivenItems
            })
        })
    }

    sendItem=(ItemDetails)=>{
    if(ItemDetails.RequestStatus==="Item Sent"){
        var RequestStatus = "Item Sent"
        db.collection('ItemsGive').doc(ItemDetails.docId).update({
            RequestStatus:RequestStatus
        })
        this.sendNotification(ItemDetails,RequestStatus)
    }else{
        var RequestStatus = "Item in processing."
        db.collection('ItemsGive').doc(ItemDetails.docId).update({
            RequestStatus:RequestStatus
        })
        this.sendNotification(ItemDetails,RequestStatus)
    }
    }

   sendNotification=(ItemDetails,RequestStatus)=>{
   var UserId = ItemDetails.UserId
   var RequestId = ItemDetails.RequestId
   db.collection('allNotifications').where("RequestId", '==', RequestId).where("UserId", '==', UserId).get()
   .then(snapshot=>{
       snapshot.forEach(doc=>{
           var message=""
           if(RequestStatus==="Item Sent"){
               message = this.state.UserId + ", your item has been sent."
           }else{
               message = this.state.UserId + ", your item is still being processed."
           }
           db.collection('allNotifications').doc(doc.id).update({
               message:message,
               NotificationStatus: Unread,
               Date: firebase.firestore.FieldValue.serverTimestamp()
           })
       })
   })
}


renderItem=({item,i})=>{
    // console.log(item)
    return(
        <ListItem
        style={styles.boxstyle}
        key={i}
        title={item.ItemName}
        subtitle={"Receiver Name: " + item.ReceiverId}
        subtitleStyle={{fontWeight:"bold"}}
        titleStyle={{color:"turquoise"}}
        rightElement={
            <TouchableOpacity 
            style={{width:30, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius:10,}}
            onPress={()=>{
            this.sendBook(item);
            }}
            >
            <Text style={{color:"blue"}}>
                {
                    item.RequestStatus==="Item Sent"
                    ?(
                    "Item Sent"
                    ):(
                    "Send Item"
                    )
                }
            </Text>
            </TouchableOpacity>
            }    
            bottomDivider
        >
        </ListItem>
    )
    }
    componentDidMount(){
        this.getNotifications();
        this.getUserDetails();
    }
    componentWillUnmount(){
        this.requestRef
    }
render(){
    return(
<View style={{flex:1}}>
{
    this.state.allDonations===0
    ?(
    <Text>{"You have not donated any books, " + this.state.UserId}</Text>
    ):(
    <FlatList
    keyExtractor={this.keyExtractor}
    data={this.state.allDonations}
    renderItem={this.renderItem} 
    >

    </FlatList>
    )
}
</View>
        )
}

}




const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    boxstyle: {
      backgroundColor: 'lightblue',
      padding:10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    itemContainer: {
      height: 80,
      width:'100%',
      borderWidth: 2,
      borderColor: 'turquoise',
      justifyContent:'center',
      alignSelf: 'center',
    }
  });