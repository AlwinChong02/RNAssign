import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
let config = require('../../config.js');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({navigation}:any){
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSignUp = () => {
    if (userName.length == 0) {
      Alert.alert('Warning', 'Please fill name');
      return;
    }

    if (userEmail.length == 0) {
      Alert.alert('Warning', 'Please fill email');
      return;
    }

    if (!userEmail.includes("@") || !userEmail.includes(".")) {
      Alert.alert('Warning', 'Please enter a valid email address');
      return;
    }

    if (userPhone.length == 0) {
      Alert.alert('Warning', 'Please fill phone number');
      return;
    }

    if (userPassword.length == 0) {
      Alert.alert('Warning', 'Please fill password');
      return;
    }

    let url = config.settings.serverUserPath + '/api/users';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: userName,
        email: userEmail,
        phone: userPhone,
        password: userPassword
      }),
    }).then((response) => {
      if (!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error: ' + response.status);
      }

      return response.json()
    }).then((responseJson) => {
      if (responseJson.affected > 0) {
        setUser();
        navigation.goBack();
      }
      else {
        console.log('respond')
        console.log(responseJson.affected);
        Alert.alert('Error saving record');
      }
    })
      .catch((error) => {
        console.error(error);
      });
  };

  const setUser = async () => {
    try {
      var theUser = {
        Name: userName,
        Email: userEmail,
        Phone: userPhone,
        Password: userPassword
      }
      await AsyncStorage.setItem('UserData', JSON.stringify(theUser));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputView}>
          <TextInput style={styles.input} placeholder='NAME' onChangeText={(UserName) => setUserName(UserName)} autoCorrect={false}
      autoCapitalize='none' />
          <TextInput style={styles.input} placeholder='EMAIL' onChangeText={(UserEmail) => setUserEmail(UserEmail)} autoCorrect={false}
      autoCapitalize='none' />
          <TextInput style={styles.input} placeholder='PHONE NUMBER' onChangeText={(UserPhone) => setUserPhone(UserPhone)} autoCorrect={false}
      autoCapitalize='none' />
          <TextInput style={styles.input} placeholder='PASSWORD' onChangeText={(UserPassword) => setUserPassword(UserPassword)} autoCorrect={false}
      autoCapitalize='none'/>
      </View>

      <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
      </View>
      
  </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
      alignItems : "center",
      paddingTop: 70,
    },
    title : {
      fontSize : 30,
      fontWeight : "bold",
      textAlign: "center",
      paddingVertical : 40,
      color : "black"
    },
    inputView : {
      gap : 15,
      width : "100%",
      paddingHorizontal : 40,
      marginBottom  :5
    },
    input : {
      height : 50,
      paddingHorizontal : 20,
      borderColor : "grey",
      borderWidth : 1,
      borderRadius: 7
    },
    button : {
      backgroundColor : "orange",
      marginTop : 20,
      height : 45,
      width : "50%",
      borderRadius : 100,
      alignItems : "center",
      justifyContent : "center",
      alignSelf : "center",
    },
    buttonText : {
      color : "white"  ,
      fontSize: 18,
      fontWeight : "bold"
    }, 
    buttonView :{
      width :"100%",
      paddingHorizontal : 50
    },
})

    