import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert, FlatList } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { render } from 'react-dom';
import Header from '../Components/Header'
import {DrawerItems} from 'react-navigation-drawer';
import Welcome from '../screens/Welcome';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.8}}>
                   <Text style={{fontWeight:"bold",marginTop:15}}>{"Hello," + firebase.auth().currentUser.email + "!"}</Text>
                    <DrawerItems {...this.props}>
                    
                    </DrawerItems>
                    <View style={{flex:0.2,justifyContent:"flex-end"}}>
                    {/* <TouchableOpacity style={{width:'100', height:30, backgroundColor:"orange", justifyContent:'center', textColor:"black"}}
                    onPress={()=>{
                        this.props.navigation.navigate('Settings')
                    }}
                    >
                        <Text>{"Settings for " + firebase.auth().currentUser.email}</Text>
                    </TouchableOpacity> */}
                    
                    <TouchableOpacity style={{width:'100', height:30, backgroundColor:"#39d2d8", justifyContent:'center'}}
                    onPress={()=>{
                        const signout = firebase.auth().signOut();
                        if(signout){
                            this.props.navigation.navigate('Welcome')
                        }else{
                            alert("It seems there was an error in signing you out," + firebase.auth().currentUser.email + ". When we tried, here is the error message we got: " + error.message + ". Please try fixing this error and try again.")
                        }
                    }}
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                   
                    </View>
                </View>
            </View>
        )
    }
}