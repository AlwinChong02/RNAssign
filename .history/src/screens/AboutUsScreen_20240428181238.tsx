import React from "react";
import type { StackScreenProps } from '@react-navigation/stack';
import {Button, View, Image, TouchableOpacity, Text, StyleSheet} from "react-native";
import { RootStackParamList } from '../../Type'; 
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';


//export type Props = StackScreenProps<RootStackParamList, 'AboutUs'>;


const AboutUsScreen = ( { route, navigation}: any ) => {
    return(
        <DrawerContentScrollView>
            <View style = {{marginTop: 5, flex:1}}>
                <View style = {{flex:0.9}}>
                    <TouchableOpacity onPress={()=>{navigation.dispatch(DrawerActions.closeDrawer())}}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                About Us
                            </Text> 
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#000000',
    }
});

  
export default AboutUsScreen;

