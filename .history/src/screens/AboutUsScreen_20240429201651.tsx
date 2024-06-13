import React from "react";
// import type { StackScreenProps } from '@react-navigation/stack';
import {
    Button,
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Linking
} from "react-native";
// import { RootStackParamList } from '../../Type';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';



//export type Props = StackScreenProps<RootStackParamList, 'AboutUs'>;

const openMapURL = (longitude: any, latitude : any) => {
    console.log('Open Map');
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
}


const AboutUsScreen = ({ route, navigation }: any) => {


    return (
        <DrawerContentScrollView>
            <View style={{ marginTop: 5,  marginBottom:5, height: 20 }}>
                <View>
                    <Text style={{
                    fontSize: 30,
                    color: 'black',
                    top: 10,
                    bottom: 10,
                    textAlign: 'center'
                    }}> About Us</Text>
                </View>
                {/* <View style={{ flex: 0.9 }}>
                    <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.closeDrawer()) }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                About Us
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View> */} 
                <Button title="" onPress={() => { openMapURL(3.03977016226, 101.794011683);}} ></Button>
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

