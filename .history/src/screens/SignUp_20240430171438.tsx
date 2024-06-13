import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

    let url = config.settings.serverPath + '/api/users';

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
        navigation.navigate('userProfile');
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
    image : {
      height : 180,
      width : 350
    },
    title : {
      fontSize : 30,
      fontWeight : "bold",
      textAlign: "center",
      paddingVertical : 40,
      color : "red"
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
      borderColor : "red",
      borderWidth : 1,
      borderRadius: 7
    },
    rememberView : {
      width : "100%",
      paddingHorizontal : 50,
      justifyContent: "space-between",
      alignItems : "center",
      flexDirection : "row",
      marginBottom : 8
    },
    switch :{
      flexDirection : "row",
      gap : 1,
      justifyContent : "center",
      alignItems : "center"
      
    },
    rememberText : {
      fontSize: 13
    },
    forgetText : {
      fontSize : 11,
      color : "red"
    },
    button : {
      backgroundColor : "red",
      height : 45,
      borderColor : "gray",
      borderWidth  : 1,
      borderRadius : 5,
      alignItems : "center",
      justifyContent : "center"
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
    optionsText : {
      textAlign : "center",
      paddingVertical : 10,
      color : "gray",
      fontSize : 13,
      marginBottom : 6
    },
    mediaIcons : {
      flexDirection : "row",
      gap : 15,
      alignItems: "center",
      justifyContent : "center",
      marginBottom : 23
    },
    icons : {
      width : 40,
      height: 40,
    },
    footerText : {
      textAlign: "center",
      color : "gray",
    },
    signup : {
      color : "red",
      fontSize : 13
    }
})

    