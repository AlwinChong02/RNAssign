import React from 'react';
import { Alert, Button, Linking, StyleSheet, View, ScrollView, Image, Text, Touchable } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'


const openMapURL = (latitude: any, longitude: any) => {
    console.log('Open Map');
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
}

const openFbURL = async () => {
    const ytbURL = 'https://www.facebook.com/UTARnet/?locale=ms_MY'
    Linking.openURL(ytbURL); //To check if URL is supported or not.
}

const openInstaURL = () => {
    const instaURL = 'https://www.instagram.com/utarnet1/'
    Linking.openURL(instaURL); //To check if URL is supported or not.
}

const openYtbURL = async () => {
    const ytbURL = 'https://www.youtube.com/@UtarEduMy'
    Linking.openURL(ytbURL); //To check if URL is supported or not.
}

const AboutUsScreen = () => {
    return (
        <ScrollView style={{ marginTop: 5, flex: 1, backgroundColor: 'white' }}>
            <View style={{ padding: 10 }}>
                <View style={{ padding: 10, borderColor: "black", borderWidth: 1, borderRadius: 10 }}>
                    <Image source={require('../img/UTAR.png')} style={{ width: 240, height: 120, alignSelf: 'center' }} />
                    <Text style={styles.titleText}>Universiti Tunku Abdul Rahman (UTAR)</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.descriptionText}>
                        Welcome to UTAR, your go-to recipe guide and food app! Whether you're a beginner or a seasoned chef, UTAR offers a diverse range of recipes, cooking tips, and culinary inspiration. Our mission is to simplify cooking, spark creativity, and foster a love for good food. Join us on a flavorful journey with UTAR today!
                    </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.urlContainer}>
                        <Ionicons name='logo-facebook' size={40} color="blue" paddingHorizontal={20} marginRight={20} />
                        <TouchableWithoutFeedback onPress={openFbURL}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>UTAR Recipe FB</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.urlContainer}>
                        <Ionicons name='logo-instagram' size={40} color="#cd486b" paddingHorizontal={20} marginRight={20} />
                        <TouchableWithoutFeedback onPress={openInstaURL}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>UTAR Recipe IG</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.urlContainer}>
                        <Ionicons name='logo-youtube' size={40} color="red" paddingHorizontal={20} marginRight={20} />
                        <TouchableWithoutFeedback onPress={openYtbURL}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>UTAR Recipe YT</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ marginTop: 50, justifyContent: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => { openMapURL(3.0402, 101.7944) }}>
                            <View style={styles.mapButton}>
                                <Ionicons name='navigate-circle' size={35} color="black" />
                                <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>  Open Map</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ top: 20, height: 150 }}></View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    urlContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionText: {
        fontSize: 15,
        textAlign: 'justify',
        padding: 15,
    },
    button: {
        width: 220,
        height: 44,
        backgroundColor: 'grey',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    mapButton: {
        height: 45,
        width: 220,
        borderRadius: 40,
        backgroundColor: '#D7FEF9',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

export default AboutUsScreen;