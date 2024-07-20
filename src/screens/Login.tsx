import React, { useState, useEffect } from 'react';
const logo = require("../../src/img/recipe_logo.jpg")
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
let config = require('../../config.js');
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({route, navigation}:any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    validateUser();
  }, [])

  const validateUser = () => {
    try {
      AsyncStorage.getItem('UserData')
        .then(value => {
          if (value != null) {
            navigation.navigate('MainMenu');
          }
        }

        )
    } catch (error) {
      console.log(error);
    }
  }

  const saveUser = async (user: { name: any; email: any; phone: any; password: any; }) => {
    try {
      var theUser = {
        Name: user.name,
        Email: user.email,
        Phone: user.phone,
        Password: user.password,
      }
      await AsyncStorage.setItem('UserData', JSON.stringify(theUser));
    } catch (error) {
      console.log(error);
    }
  }

  const handleSignIn = () => {
    if (email.length == 0 || password.length == 0) {
      Alert.alert('Warning', 'Please fill in email / password!');
      return;
    }

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
      Alert.alert('Warning', 'Please enter a valid email address!');
      return;
    }

    let url = config.settings.serverUserPath + '/api/users/' + email;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Warning', 'No account found. Please register an account');
          throw Error('Error: ' + response.status);
        }
        return response.json();
      })
      .then(user => {
        if (user != null) {
          if (password === user.password) {
            setUser(user);
            saveUser(user);
            navigation.navigate('MainMenu');
          } else {
            Alert.alert('Warning', 'Incorrect password. Please try again');
          }
        } else {
          Alert.alert('Warning', 'No account found. Please register an account');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode='contain' />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
          <TextInput style={styles.input} placeholder='EMAIL' 
          underlineColorAndroid="transparent"
          onChangeText={(value) => setEmail(value)} 
          autoCorrect={false}
          autoCapitalize='none' 
          />
          <TextInput style={styles.input} placeholder='PASSWORD' 
          secureTextEntry value={password} 
          onChangeText={setPassword} 
          autoCorrect={false}
          autoCapitalize='none'
          />
      </View>
      <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
      </View>
      <View style ={{flexDirection: 'row', justifyContent:'center'}}>
        <Text style={styles.footerText}>Don't Have Account?
          <Pressable onPress={() => navigation.navigate('SignUp')} style={{flexDirection:'row'}}>
            <Text>   </Text>
            <Text style={styles.signup}>Sign Up</Text>
          </Pressable>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
      flex: 1,
      alignItems : "center",
      justifyContent: "flex-start",
      paddingTop: 70,
      backgroundColor: 'transparent'
    },
    image : {
      height : 180,
      width : 350,
      alignSelf: 'flex-start',
      marginLeft: 20,
      opacity: 0.8,
    },
    title : {
      fontSize : 30,
      fontWeight : "bold",
      textTransform : "uppercase",
      paddingVertical : 30,
      color : "black",
    },
    inputView : {
      bottom : 15,
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
      borderRadius: 7,
      color : "black"
    },
    button : {
      backgroundColor : "orange",
      height : 45,
      width : "50%",
      borderRadius : 100,
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
      alignItems: "center",
      justifyContent : "center",
      marginTop : 20
    },
    footerText : {  
      flexDirection: 'row',
      color : "gray",
      alignContent : "center",
    },
    signup : {
      color : "red",
      fontSize : 13,
      fontWeight : "bold",
      textDecorationLine : "underline",
    },
})
    