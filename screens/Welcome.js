import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput, Modal, ScrollView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import { render } from 'react-dom';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emailId:"",
            password:"",
            ismodalvisible: false,
            Address: "",
            PhoneNumber: "",
            UserId: "",
            Username: "",
            confirmPassword: "",
        }
    }

//showModal Function
showModal=()=>{
return(
<Modal animationType="cube"
transparent= {false}
visible={this.state.ismodalvisible}>
<View style={{marginTop:80}}>
    <ScrollView>
        <KeyboardAvoidingView>
            <Text style={styles.title}>Sign Up For Easy Barter</Text>
            <TextInput style={styles.loginBox} placeholder="Username" 
            onChangeText={user=>{
            this.setState({
                Username: user,
            })
            }}
            />
            <TextInput style={styles.loginBox} placeholder="Email(example@domain.com)"
            keyboardType={"email-address"}
            onChangeText={email=>{
                this.setState({
                    UserId:email
                })
            }}            
            ></TextInput>
            <TextInput style={styles.loginBox} placeholder="Preferred Password"
            secureTextEntry={true}
            onChangeText={password=>{
                this.setState({
                    password:password
                })
            }}            
            ></TextInput>
                <TextInput style={styles.loginBox} placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={confirm=>{
                this.setState({
                    confirmPassword:confirm
                })
            }}            
            ></TextInput>
            <TextInput style={styles.loginBox} placeholder="Address"
            maxLength={100}
            multiline={true}
            onChangeText={address=>{
                this.setState({
                    Address:address
                })
            }}            
            ></TextInput>
            <TextInput style={styles.loginBox} placeholder="Phone Number"
            maxLength={10}
            keyboardType={"numeric"}
            keyboardType={"number-pad"}
            onChangeText={phonenumber=>{
                this.setState({
                    PhoneNumber:phonenumber
                })
            }}            
            ></TextInput>
            <TouchableOpacity style={styles.text} onPress={()=>{
                this.userSignUp(
                    this.state.UserId,
                    this.state.password,
                    this.state.confirmPassword,
                )
            }}>
            <Text>Register</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.text} onPress={()=>{
            this.setState({
                ismodalvisible:false
            })
            }}>
            <Text>Cancel</Text> 
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </ScrollView>
</View>
</Modal>
)
}



userSignUp=(email,password,confirmPassword)=>{
if(password!==confirmPassword){
return(
    alert("Your password doesn't match," + this.state.Username)
)
}else{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(response=>{
        return(
           Alert.alert("Your account has been created successfully, " ,this.state.Username, [{text:"Go Back To Login", onPress:()=>{
               this.setState({
                   ismodalvisible:false
               })
           }}])
        )
    }).catch(function(error){
        return(
            alert("We have encountered an error. Here is what it is: " + error.message + ".")
        )
    })
    db.collection('users').add({
        Address: this.state.Address,
        PhoneNumber: this.state.PhoneNumber,
        UserId: this.state.UserId,
        Username: this.state.Username,
        confirmPassword: this.state.confirmPassword,
    })
}
}

//creating text inputs for login and signup
login=(emailId,password)=>{
    console.log(emailId);

firebase.auth().signInWithEmailAndPassword(emailId,password).then(()=>{
    return(
    this.props.navigation.navigate('Drawer')        
    )
}).catch(error=>{
    switch(error.code){
        case 'auth/user-not-found':
            alert("It appears that you don't have an account with EasyBarter "+ emailId +". Instead of clicking the Login button, please click the sign up button first. 🧾");
            console.log(error.message)
        break;
        case 'auth/invalid-email':
            alert("Your email is invalid. You should format it to be something like example@domain.com.");
            console.log(error.message)
            break;
        case 'auth/wrong-password':
            alert("Your password is invalid, "+ emailId + "! Please enter the correct password to continue.");
            console.log(error.message)
            break;
        
    }})
}
signup=(emailId,password)=>{
    console.log(emailId);
    firebase.auth().createUserWithEmailAndPassword(emailId,password).then((response)=>{
        return(
            this.props.navigation.navigate('Drawer')
            (
           Alert. alert("You have been successfully signed up.")
            ) )
    }).catch(error=>{
        // alert("We could not sign you up, and here is the error we got when we tried: "+ error.message + " Please try to fix this error, and then try again.");
    })
    }

render(){
    return(
        <View marginTop={200}>
        <View>
        {this.showModal()}
        </View>
        <Text style={styles.title}> Login To Easy Barter</Text>
        <TextInput style={styles.loginBox} placeholder="Email(example@domain.com) " keyboardType='email-address'
        onChangeText={text=>{
            this.setState({
                emailId:text
            })
        }}
        />
      <TextInput style={styles.loginBox} placeholder="Enter Your Password" secureTextEntry={true}
      onChangeText={text=>{
          this.setState({
              password:text
          })
      }}
      />
      <TouchableOpacity onPress={()=>{
          this.login(
              this.state.emailId,this.state.password
          )
      }} style={styles.text}>
        <Text>Login</Text>      
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        this.setState({ismodalvisible:true})
      }} style={styles.text}>
        <Text>Sign Up Here</Text>      
      </TouchableOpacity>
        </View>
    )
}
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor:'white',
    },
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        alignSelf:"center",
        justifyContent: "center",
        borderColor:"#FF7F50",
        borderRadius: 500,
  
    },
    text:{
        fontSize:30,
        textAlign:"center",
        marginBottom:50,
        alignSelf:"center",
        backgroundColor:'#c54245',
        height:60,
        width:120,
        paddingTop:13,
        borderWidth:3,
        borderRadius:1,
        justifyContent:"center",
        borderRadius: 10
    },

    title:{
        fontSize: 40,
        textAlign:'center',
        alignSelf: 'center',
        color:"#D2B48C"
    }
})





    



