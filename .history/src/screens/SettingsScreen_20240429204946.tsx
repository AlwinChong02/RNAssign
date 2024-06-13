import React  from "react";
import type { StackScreenProps } from '@react-navigation/stack';
import {Button, View, StyleSheet, TouchableNativeFeedback, Text} from "react-native";
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../Type'; 

//export type Props = StackScreenProps<RootStackParamList, 'Setting'>;

const SettingsScreen = ( { route, navigation}: any ) => {
    return(
        <View style = {{marginTop: 5, flex:1, }}>
            <View style = {{flex:0.75}}>
                <TouchableNativeFeedback onPress={()=>{navigation.navigate('AboutUs')}}>
                    <View style={styles.button}>
                        <Ionicons name="information-circle" size={24} color="black" />
                        <Text style={styles.buttonText}>
                            About Us
                        </Text> 
                    </View>
                </TouchableNativeFeedback>
                <View style = {{marginTop:1}}>
                </View>
                {/* MX Code Update User Profile*/}
                <TouchableNativeFeedback onPress={()=>{navigation.navigate('UserProfile')}}>  
                    <View style={styles.button}>
                    <Ionicons name="people" size={24} color="black" />
                        <Text style={styles.buttonText}>
                            User Profile
                        </Text> 
                    </View> 
                </TouchableNativeFeedback>
                <View style = {{marginTop:1}}>
                </View>
                <TouchableNativeFeedback onPress={()=>{navigation.navigate('Feedback')}}>
                    <View style={styles.button}>
                    <Ionicons name="share" size={24} color="black" />
                        <Text style={styles.buttonText}>
                            Feedback
                        </Text> 
                    </View>
                </TouchableNativeFeedback>
                <View style = {{marginTop:1}}>
                </View>
                <TouchableNativeFeedback onPress={()=>{navigation.navigate('ViewFeedback')}}>
                    <View style={styles.button}>
                    <Ionicons name="reader" size={24} color="black" />
                        <Text style={styles.buttonText}>
                            ViewFeedback
                        </Text> 
                    </View>
                </TouchableNativeFeedback>
                <View style = {{marginTop:1}}>
                </View>
            </View>
            {/* MX Code LoginPage*/}
            <TouchableNativeFeedback onPress={()=>{navigation.navigate('Setting')}}>
                <View style={styles.logOutButton}>
                    <Text style={styles.logOutButtonText}>
                        Logout
                    </Text> 
                </View>
            </TouchableNativeFeedback>

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: 'row',
      },
    buttonText: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center',
        marginLeft: 10,
      },
    logOutButton: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 50,
      },
    logOutButtonText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
      },
});

export default SettingsScreen;