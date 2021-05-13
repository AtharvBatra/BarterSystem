import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Alert, Text, Modal, KeyboardAvoidingView, ScrollView,} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component{
    constructor(){
      super()
      this.state={
        emailId:'',
        password:'',
        isModalVisible:'false',
        firstName:'',
        lastName:'',
        address:'',
        mobileNumber:'',
        confirmPassword:'',
        username:'',
      }
    }

    userSignUp = (emailId, password, confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\check your password.")
        }else{
            firebase.auth().createUserWithEmailAndPassword(username, password)
            .then((response)=>{
                db.collection('users').add({
                    first_name:this.state.firstName,
                    last_name:this.state.lastName,
                    mobile_number:this.state.mobileNumber,
                    username:this.state.username,
                    address:this.state.address
                })
                return Alert.alert(
                    'User added successfully',
                    '',
                    [
                        {text:'OK', onPress: () => this.setState({isModalVisible : false})}
                    ]
                );
            })
            .catch(function(error){
                //This is where the errors are handled
                var code=error.code;
                var errorMessage=error.message;
                return Alert.alert(errorMessage)
            });
        }
    }

    userLogin = (emailId, password) =>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
            return Alert.alert("Login Successful")
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert.Alert(errorMessage)
        })
    }

    showModal=()=>{
        <Modal 
            animationType="fade"
            transparent={true}
            visible={this.state.visible}
        />
        
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Bartering</Text>

                </View>
            <View>
                    <TextInput
                    style={styles.loginBox}
                    placeholder='abc@example.com'
                    keyboardType='email-address'
                    onChangeText={(text)=>{{
                        this.setState({
                            emailId:text
                        })
                    }}} />
                    <TextInput 
                    style={styles.loginBox}
                    secureTextEntry={true}
                    placeholder='enter password'
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#FFAE19'
    },
    title:{
        fontWeight:'bold',
        fontSize:'30',
        alignContent:'center'
    },
    loginBox: {
      width: "80%",
      height: 50,
      borderWidth: 1.5,
      borderColor: "#ffffff",
      fontSize: 20,
      paddingLeft: 10,
    },
    button: {
      width: "80%",
      marginTop:15,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      backgroundColor: "#ffff",
      shadowColor: "#000",
      marginBottom:10,
      shadowOffset: {
        width: 0,
        height: 8,
      },
  buttonText: {
    color: "#0586ff",
    fontWeight: "200",
    fontSize: 20,
  }
    }
  })